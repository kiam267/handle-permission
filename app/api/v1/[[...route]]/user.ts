import { clerkClient } from '@clerk/nextjs/server';
import { getAuth } from '@hono/clerk-auth';
import { Hono } from 'hono';

const user = new Hono();

user.post('/delete', async c => {
  const clerk = await clerkClient();
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.json({
      error: true,
      message: 'User not exit',
    });
  }
  // clerk.users.deleteUser();
  return c.json({
    message: 'work',
  });
});

export default user;
