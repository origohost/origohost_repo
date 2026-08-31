import type { Access } from 'payload';

export const publishedOrAdmin: Access = ({ req: { user } }) => {
  if (user) {
    return true;
  }
  return {
    _status: {
      equals: 'published',
    },
  };
};

export const authenticatedOnly: Access = ({ req: { user } }) => {
  return Boolean(user);
};

export const anyoneCanRead: Access = () => true;
