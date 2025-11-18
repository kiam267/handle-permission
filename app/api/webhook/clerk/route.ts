import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { clerkMiddleware } from '@/lib/clerk/middleware';

export async function POST(req: Request) {
  const evt = await clerkMiddleware(req);
  const clerk = await clerkClient();
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
