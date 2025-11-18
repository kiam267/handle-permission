import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { handle } from 'hono/vercel';
import user from './user';

const app = new Hono().basePath('/api/v1');

app.get('/hello', c => {
  return c.json({
    message: 'Hello Next.js!',
  });
});

app.use('*', clerkMiddleware());
app.route('/user', user);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
