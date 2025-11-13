import { User, Comment, Role, Todo } from '@/data/types';

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((
      user: User,
      data: Permissions[Key]['dataType']
    ) => boolean);

type RolesWithPermission = {
  [R in Role]: Partial<{
    [key in keyof Permissions]: Partial<{
      [Action in Permissions[key]['action']]: PermissionCheck<key>;
    }>;
  }>;
};

type Permissions = {
  comments: {
    dataType: Comment;
    action: 'view' | 'create' | 'update';
  };
  todos: {
    dataType: Todo;
    action: 'view' | 'create' | 'update' | 'delete';
  };
};

const ROLES = {
  admin: {
    comments: {
      view: true,
      create: true,
      update: true,
    },
    todos: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },

  moderator: {
    comments: {
      view: true,
      create: true,
      update: true,
    },
    todos: {
      view: true,
      create: true,
      update: true,
      delete: (user, todo) => todo.completed,
    },
  },

  user: {
    comments: {
      view: (user, comment) =>
        !user.blockedBy.includes(comment.authorId),
      create: true,
      update: true,
    },
    todos: {
      view: (user, comment) =>
        !user.blockedBy.includes(comment.userId),
      create: true,
      update: (user, todo) =>
        todo.userId === user.id ||
        todo.invitedUser.includes(user.id),
      delete: (user, todo) =>
        todo.userId === user.id ||
        (todo.invitedUser.includes(user.id) &&
          todo.completed),
    },
  },
} as const satisfies RolesWithPermission;

export function hasPermission<
  Resource extends keyof Permissions
>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]['action'],
  data?: Permissions[Resource]['dataType']
) {
  return user.roles.some(role => {
    const permission = (ROLES as RolesWithPermission)[role][
      resource
    ]?.[action];
    if (permission == null) return false;
    if (typeof permission === 'boolean') return permission;
    return data != null && permission(user, data);
  });
}
