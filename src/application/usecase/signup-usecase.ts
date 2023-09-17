import { SignUp } from "~/domain/usecase";
import { User } from "~/domain/entity";
import { EmailFoundError } from "~/domain/error";
import type { UserRepository } from "../repository";

export class SignUpUseCase implements SignUp {
  constructor(
    readonly repository: UserRepository
  ) {}

  async execute(input: SignUp.Input): Promise<SignUp.Output> {
    const userFound = await this.repository.getByEmail({
      email: input.email
    });
    if (userFound) {
      throw new EmailFoundError('E-mail already registered');
    }
    const user = User.create(input.email, input.password);
    try {
      const output = await this.repository.insert(user);
      return output;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }
}
