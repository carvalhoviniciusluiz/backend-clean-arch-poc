import { EntitySchema } from '@mikro-orm/core';

export const UserSchemaMongo = new EntitySchema({
  name: 'User',
  properties: {
    _id: { primary: true, type: 'string' },
    email: { type: 'string' }
  }
});
