import { EntitySchema } from 'typeorm';
import { UserTypeOrm } from './user.typeorm';

export const UserSchema = new EntitySchema<UserTypeOrm>({
  name: UserTypeOrm.name,
  tableName: 'users',
  target: UserTypeOrm,
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      length: 26
    },
    email: {
      type: String,
      length: 255
    },
    passwordHashed: {
      type: String,
      length: 255,
      name: 'password_hashed'
    },
    salt: {
      type: String,
      length: 255
    },
    createdAt: {
      type: 'datetime',
      createDate: true,
      name: 'created_at'
    },
    updatedAt: {
      type: 'datetime',
      updateDate: true,
      name: 'updated_at'
    },
    deletedAt: {
      type: 'datetime',
      deleteDate: true,
      name: 'deleted_at',
      nullable: true,
      default: null
    }
  },
  indices: [
    {
      name: 'IDX_USER_ID',
      columns: ['id']
    },
    {
      name: 'IDX_USER_EMAIL',
      columns: ['email']
    }
  ]
});
