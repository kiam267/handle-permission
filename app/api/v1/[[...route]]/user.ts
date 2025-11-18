import { clerkClient } from '@clerk/nextjs/server';
import { getAuth } from '@hono/clerk-auth';
import { Hono } from 'hono';

const user = new Hono();

user.post('/deletes', async c => {
  const clerk = await clerkClient();
  const auth = getAuth(c);
  const { rows } = await c.req.json();
  if (!auth?.userId) {
    return c.json({
      error: true,
      message: 'User not exit',
    });
  }
  console.log(rows[0]);

  // clerk.users.deleteUser();
  return c.json({
    message: 'work',
  });
});

export default user;
