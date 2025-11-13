import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  clerkClient,
  WebhookEvent,
} from '@clerk/nextjs/server';

const CLERK_WEBHOOK_SECRET =
  process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const headerPayload = await headers();
  const clerk = await clerkClient();

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
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error(
      '❌ Webhook signature verification failed:',
      err
    );
    return new Response('Invalid signature', {
      status: 400,
    });
  }

  if (evt.type === 'user.created') {
    const { id } = evt.data;

    try {
      await clerk.users.updateUser(id, {
        publicMetadata: { roles: ['user'] },
      });
    } catch (err) {
      console.error('Error setting role:', err);
      return new Response('Failed to update user', {
        status: 500,
      });
    }
  }

  return NextResponse.json({ success: true });
}
