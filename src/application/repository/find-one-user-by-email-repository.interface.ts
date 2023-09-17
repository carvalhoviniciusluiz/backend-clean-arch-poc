import { User } from "~/domain/entity";

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
