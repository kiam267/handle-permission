import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// Database connection setup for Neon
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

// Organizations table
export const organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Roles table
export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// UserRole junction table (many-to-many between User and Role)
export const userRoles = pgTable('user_roles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  roleId: integer('role_id')
    .notNull()
    .references(() => roles.id, { onDelete: 'cascade' }),
  organizationId: integer('organization_id')
    .notNull()
    .references(() => organizations.id, {
      onDelete: 'cascade',
    }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Permissions table
export const permissions = pgTable('permissions', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
  resource: text('resource').notNull(), // e.g., 'blog', 'user', 'organization'
  action: text('action').notNull(), // e.g., 'create', 'read', 'update', 'delete'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// RolePermission junction table (many-to-many between Role and Permission)
export const rolePermissions = pgTable(
  'role_permissions',
  {
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
    permissionId: integer('permission_id')
      .notNull()
      .references(() => permissions.id, {
        onDelete: 'cascade',
      }),
    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  },
  table => ({
    pk: primaryKey({
      columns: [table.roleId, table.permissionId],
    }),
  })
);

// Blogs table
export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  content: text('content'),
  published: boolean('published').default(false).notNull(),
  organizationId: integer('organization_id')
    .notNull()
    .references(() => organizations.id, {
      onDelete: 'cascade',
    }),
  authorId: integer('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// BlogRole junction table (managing blog-specific roles)
export const blogRoles = pgTable('blog_roles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  blogId: integer('blog_id')
    .notNull()
    .references(() => blogs.id, { onDelete: 'cascade' }),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// UserBlogRole junction table (assigning users to blog-specific roles)
export const userBlogRoles = pgTable('user_blog_roles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  blogRoleId: integer('blog_role_id')
    .notNull()
    .references(() => blogRoles.id, {
      onDelete: 'cascade',
    }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// BlogRolePermission junction table (assigning permissions to blog roles)
export const blogRolePermissions = pgTable(
  'blog_role_permissions',
  {
    blogRoleId: integer('blog_role_id')
      .notNull()
      .references(() => blogRoles.id, {
        onDelete: 'cascade',
      }),
    permissionId: integer('permission_id')
      .notNull()
      .references(() => permissions.id, {
        onDelete: 'cascade',
      }),
    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  },
  table => ({
    pk: primaryKey({
      columns: [table.blogRoleId, table.permissionId],
    }),
  })
);

// Relations
export const organizationsRelations = relations(
  organizations,
  ({ many }) => ({
    userRoles: many(userRoles),
    blogs: many(blogs),
  })
);

export const usersRelations = relations(
  users,
  ({ many }) => ({
    userRoles: many(userRoles),
    blogs: many(blogs),
    userBlogRoles: many(userBlogRoles),
  })
);

export const rolesRelations = relations(
  roles,
  ({ many }) => ({
    userRoles: many(userRoles),
    rolePermissions: many(rolePermissions),
  })
);

export const userRolesRelations = relations(
  userRoles,
  ({ one }) => ({
    user: one(users, {
      fields: [userRoles.userId],
      references: [users.id],
    }),
    role: one(roles, {
      fields: [userRoles.roleId],
      references: [roles.id],
    }),
    organization: one(organizations, {
      fields: [userRoles.organizationId],
      references: [organizations.id],
    }),
  })
);

export const permissionsRelations = relations(
  permissions,
  ({ many }) => ({
    rolePermissions: many(rolePermissions),
    blogRolePermissions: many(blogRolePermissions),
  })
);

export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
  })
);

export const blogsRelations = relations(
  blogs,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [blogs.organizationId],
      references: [organizations.id],
    }),
    author: one(users, {
      fields: [blogs.authorId],
      references: [users.id],
    }),
    blogRoles: many(blogRoles),
  })
);

export const blogRolesRelations = relations(
  blogRoles,
  ({ one, many }) => ({
    blog: one(blogs, {
      fields: [blogRoles.blogId],
      references: [blogs.id],
    }),
    userBlogRoles: many(userBlogRoles),
    blogRolePermissions: many(blogRolePermissions),
  })
);

export const userBlogRolesRelations = relations(
  userBlogRoles,
  ({ one }) => ({
    user: one(users, {
      fields: [userBlogRoles.userId],
      references: [users.id],
    }),
    blogRole: one(blogRoles, {
      fields: [userBlogRoles.blogRoleId],
      references: [blogRoles.id],
    }),
  })
);

export const blogRolePermissionsRelations = relations(
  blogRolePermissions,
  ({ one }) => ({
    blogRole: one(blogRoles, {
      fields: [blogRolePermissions.blogRoleId],
      references: [blogRoles.id],
    }),
    permission: one(permissions, {
      fields: [blogRolePermissions.permissionId],
      references: [permissions.id],
    }),
  })
);

// Type exports
export type Organization =
  typeof organizations.$inferSelect;
export type NewOrganization =
  typeof organizations.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;
export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
