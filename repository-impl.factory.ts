import { DataSource } from 'typeorm';
import { UserTypeOrmRepository } from "./user-typeorm-repository";
import { UserTypeOrm } from './user.typeorm';

export interface RepositoryFactory {
  createUserTypeOrmRepository (): UserTypeOrmRepository;
}

// Abstract Factory
export class RepositoryFactoryImpl implements RepositoryFactory {
  constructor (private readonly ds: DataSource) {}

  createUserTypeOrmRepository(): UserTypeOrmRepository {
    return new UserTypeOrmRepository(this.ds.getRepository(UserTypeOrm));
  }
}
