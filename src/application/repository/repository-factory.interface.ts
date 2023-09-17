import type { UserRepository } from "../repository";

export interface RepositoryFactory {
  createUserTypeOrmRepository (): UserRepository;
}
