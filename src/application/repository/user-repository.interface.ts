import { CreateUserRepository } from "./create-user-repository.interface";
import { FindOneUserByEmailRepository } from "./find-one-user-by-email-repository.interface";

export interface UserRepository extends CreateUserRepository, FindOneUserByEmailRepository {}
