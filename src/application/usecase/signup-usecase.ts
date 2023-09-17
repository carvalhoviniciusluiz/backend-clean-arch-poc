import { User } from "../../domain/entity";
import { EmailFoundError } from "../../domain/error";
import type { SignUp } from "../../domain/usecase";
import type { CreateUserRepository, FindOneUserByEmailRepository } from "../repository";

type SignUpRepository = CreateUserRepository &
  FindOneUserByEmailRepository;

export class SignUpUseCase implements SignUp {
  constructor(
    readonly repository: SignUpRepository
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
