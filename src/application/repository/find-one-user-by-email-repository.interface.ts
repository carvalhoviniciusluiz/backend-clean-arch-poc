import { User } from "../../domain/entity/user";

export interface FindOneUserByEmailRepository {
  getByEmail(
    input: FindOneUserByEmailRepository.Input
  ): Promise<FindOneUserByEmailRepository.Output>;
}
export namespace FindOneUserByEmailRepository {
  export type Input = {
    email: string;
  };
  export type Output = User | undefined;
}
