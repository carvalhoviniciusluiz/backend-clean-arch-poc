import type { UsecaseFactory } from "~/domain/usecase";
import type { RepositoryFactory } from "../repository";
import { SignUpUseCase } from "../usecase";

// Abstract Factory
export class UsecaseImplFactory implements UsecaseFactory {
  constructor (private readonly repositoryFactory: RepositoryFactory) {}

  createSignUp () {
    return new SignUpUseCase(this.repositoryFactory.createUserTypeOrmRepository());
  }
}
