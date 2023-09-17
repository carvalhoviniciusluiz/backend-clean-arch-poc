import { User } from "./user";

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

export interface SignUp {
  execute(input: SignUp.Input): Promise<SignUp.Output>;
}
export namespace SignUp {
  export type Input = {
    email: string;
    password: string;
  };
  export type Output = {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export class UserFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = UserFoundError.name;
  }
}

export type SignUpRepository = CreateUserRepository &
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
      throw new UserFoundError('E-mail already registered');
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
