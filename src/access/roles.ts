import type { Access } from 'payload';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'AUTHOR';

export const isSuperAdmin: Access = ({ req: { user } }) => {
  return Boolean(user && user.role === 'SUPER_ADMIN');
};

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user && (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN'));
};

export const isEditor: Access = ({ req: { user } }) => {
  return Boolean(
    user && (user.role === 'EDITOR' || user.role === 'ADMIN' || user.role === 'SUPER_ADMIN')
  );
};

export const publishedOrEditor: Access = ({ req: { user } }) => {
  if (user && (user.role === 'EDITOR' || user.role === 'ADMIN' || user.role === 'SUPER_ADMIN')) {
    return true;
  }
  return {
    _status: {
      equals: 'published',
    },
  };
};
