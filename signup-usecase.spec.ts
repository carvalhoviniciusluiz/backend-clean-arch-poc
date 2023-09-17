import { faker } from '@faker-js/faker';
import { CreateUserRepository, FindOneUserByEmailRepository, SignUpUseCase, UserFoundError } from "./signup-usecase";
import { User } from "./user";

const UserInMemoryRepository = class implements CreateUserRepository, FindOneUserByEmailRepository {
  users: User[] = [];
  async insert(input: User): Promise<CreateUserRepository.Output> {
    this.users.push(input);
    return {
      id: input.id,
      email: input.email.getValue(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
  async getByEmail(
    input: FindOneUserByEmailRepository.Input
  ): Promise<FindOneUserByEmailRepository.Output> {
    const output = this.users.find(
      user => user.email.getValue() === input.email
    );
    return output;
  }
};

describe('SignUpUseCase', () => {
  let userRepository: any;
  let signUp: SignUpUseCase;
  beforeAll(() => {
    userRepository = new UserInMemoryRepository();
    signUp = new SignUpUseCase(
      userRepository
    );
  });
  test('Não deve permitir cadastrar email existente', async () => {
    const input = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    await signUp.execute(input);
    const promise = signUp.execute(input);
    await expect(promise).rejects.toThrowError(
      new UserFoundError('E-mail already registered')
    );
  });
  test('Deve retornar um erro caso a transação falhe', async () => {
    jest
      .spyOn(userRepository, 'getByEmail')
      .mockImplementationOnce(async () => undefined);
    jest.spyOn(userRepository, 'insert').mockRejectedValueOnce(new Error('any_error'));
    const promise = signUp.execute({
      email: faker.internet.email(),
      password: faker.internet.password()
    });
    await expect(promise).rejects.toThrowError('Error: any_error');
  });
});
