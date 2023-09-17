import { User } from "../../domain/entity/user";

export interface CreateUserRepository {
  insert(
    input: CreateUserRepository.Input
  ): Promise<CreateUserRepository.Output>;
}
export namespace CreateUserRepository {
  export type Input = User;
  export type Output = {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
