export type Role = keyof typeof ROLES;
// Fist get ROLE name 
type Permission = (typeof ROLES)[Role][number];


const ROLES = {
  admin: [
    'view:comments',
    'create:comments',
    'update:comments',
    'delete:comments',
  ],
  moderator: [
    'view:comments',
    'create:comments',
    'update:ownComments',
    'delete:comments',
  ],
  user: [
    'view:comments',
    'create:comments',
    'update:ownComments',
    'delete:ownComments',
  ],
} as const;
export function hasPermission(
  user: { id: string; role: Role },
  permission: Permission
) {
  return (
    ROLES[user.role] as readonly Permission[]
  ).includes(permission);
}
