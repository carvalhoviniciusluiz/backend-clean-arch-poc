import { DataSource } from 'typeorm';
import type { RepositoryFactory, UserRepository } from '~/application/repository';
import { UserTypeOrm } from '../database/typeorm/entity';
import { UserTypeOrmRepository } from '../repository/typeorm';

// Abstract Factory
export class RepositoryImplFactory implements RepositoryFactory {
  constructor (private readonly ds: DataSource) {}

  createUserTypeOrmRepository(): UserRepository {
    return new UserTypeOrmRepository(this.ds.getRepository(UserTypeOrm));
  }
}
