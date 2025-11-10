import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { hasPermission, Role } from '@/lib/auth';
import { auth } from '@clerk/nextjs/server';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
export async function CardDemo() {
  const user: { id: string; role: Role } = {
    id: '2',
    role: 'user',
  };
  const authorId = '2';
  const { sessionClaims, userId } = await auth();

  if (userId === null || sessionClaims === null) {
    return (
      <Button>
        <SignInButton />
      </Button>
    );
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <h3>My Role: {sessionClaims?.metadata.role}</h3>
        <CardTitle>Handel Permission</CardTitle>
      </CardHeader>
      <CardContent>
        {hasPermission(
          {
            id: userId as string,
            role: sessionClaims?.metadata.role as Role,
          },
          'delete:comments'
        ) ||
          (hasPermission(user, 'delete:ownComments') &&
            user.id === authorId && (
              <Button
                variant="destructive"
                className="w-full cursor-pointer"
              >
                Delete
              </Button>
            ))}
      </CardContent>
      <CardFooter>
        <Button>
          <SignOutButton redirectUrl="/" />
        </Button>
      </CardFooter>
    </Card>
  );
}
