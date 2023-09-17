import { RepositoryFactory } from "./repository-impl.factory";
import { SignUp, SignUpUseCase } from "./signup-usecase";

export interface UsecaseFactory {
  createSignUp (): SignUp;
}

// Abstract Factory
export default class UsecaseFactoryImpl implements UsecaseFactory {
  constructor (private readonly repositoryFactory: RepositoryFactory) {}

  createSignUp () {
    return new SignUpUseCase(this.repositoryFactory.createUserTypeOrmRepository());
  }
}
