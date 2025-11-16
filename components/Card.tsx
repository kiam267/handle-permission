import { CheckIcon, XIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { hasPermission } from '@/lib/auth';
import { auth } from '@clerk/nextjs/server';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { Todo, User } from '@/data/types';

export async function CardDemo() {
  const { sessionClaims, userId } = await auth();

  if (userId === null || sessionClaims === null) {
    return (
      <Button asChild>
        <SignInButton />
      </Button>
    );
  }
  const user: User = {
    roles: ['admin', 'user'],
    id: userId,
    blockedBy: ['1'],
  };
  const todos = [
    {
      id: '1',
      title: 'A',
      userId: '1',
      completed: false,
      invitedUser: [],
    },
    {
      id: '2',
      title: 'B',
      userId: '2',
      completed: false,
      invitedUser: [],
    },
    {
      id: '3',
      title: 'C',
      userId: '3',
      completed: true,
      invitedUser: [],
    },
    {
      id: '4',
      title: 'D',
      userId: '4',
      completed: false,
      invitedUser: ['1', '3'],
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <h5>
          {user.id} : {user.roles.join(' ')}
        </h5>
        <CardTitle>Handel Permission</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="my-5 flex gap-4">
          <GeneralButtonCheck
            user={user}
            resource="todos"
            action="view"
          />
          <GeneralButtonCheck
            user={user}
            resource="todos"
            action="create"
          />
          <GeneralButtonCheck
            user={user}
            resource="todos"
            action="update"
          />
          <GeneralButtonCheck
            user={user}
            resource="todos"
            action="delete"
          />
        </div>
        <ul className="grid gap-4 grid-cols-2">
          {todos.map(todo => (
            <li key={todo.id}>
              <TodoList user={user} {...todo} />
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <SignOutButton redirectUrl="/" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function TodoList({ user, ...todo }: { user: any } & Todo) {
  const { title, userId, completed, invitedUser } = todo;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          {completed ? (
            <CheckIcon className="text-green-500" />
          ) : (
            <XIcon className="text-destructive" />
          )}
        </CardTitle>
        <CardDescription>
          User {userId}{' '}
          {invitedUser.length > 0 &&
            `+ User ${invitedUser.join(', User ')}`}
        </CardDescription>
      </CardHeader>
      <CardFooter className="gap-2">
        <TodoButtonCheck
          user={user}
          action="view"
          todo={todo}
        />
        <TodoButtonCheck
          user={user}
          action="update"
          todo={todo}
        />
        <TodoButtonCheck
          user={user}
          action="delete"
          todo={todo}
        />
      </CardFooter>
    </Card>
  );
}

function GeneralButtonCheck({
  action,
  resource,
  user,
}: {
  resource: 'todos' | 'comments';
  user: User;
  action: 'view' | 'create' | 'update' | 'delete';
}) {
  return (
    <Button
      variant={
        hasPermission(user, resource, action,  )
          ? 'default'
          : 'destructive'
      }
    >
      {' '}
      {action}
    </Button>
  );
}

function TodoButtonCheck({
  todo,
  user,
  action,
}: {
  todo: Todo;
  user: User;
  action: 'view' | 'delete' | 'update' | 'create';
}) {
  return (
    <Button
      variant={
        hasPermission(user, 'todos', action, todo)
          ? 'default'
          : 'destructive'
      }
    >
      {action}
    </Button>
  );
}
