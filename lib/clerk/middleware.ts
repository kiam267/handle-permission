import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  clerkClient,
  WebhookEvent,
} from '@clerk/nextjs/server';
import { HonoRequest } from 'hono';

const CLERK_WEBHOOK_SECRET =
  process.env.CLERK_WEBHOOK_SECRET!;

export async function clerkMiddleware(
  req: Request | HonoRequest
) {
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const headerPayload = await headers();

  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get(
    'svix-timestamp'
  );
  const svix_signature = headerPayload.get(
    'svix-signature'
  );

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', {
      status: 400,
    });
  }

  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = (await wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })) as WebhookEvent;
  } catch (err) {
    console.error(
      '❌ Webhook signature verification failed:',
      err
    );
    return new Response('Invalid signature', {
      status: 400,
    });
  }

  return evt;
}
