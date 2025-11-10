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

export function CardDemo() {
  const user: { id: string; role: Role } = {
    id: '2',
    role: 'user',
  };
  const authorId = '2';

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Handel Permission</CardTitle>
      </CardHeader>
      <CardContent>
        {hasPermission(user, 'delete:comments') ||
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
    </Card>
  );
}
