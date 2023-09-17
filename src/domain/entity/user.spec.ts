import { faker } from '@faker-js/faker';
import { User } from "./user";
describe('user', () => {
  test('Não deve permitir um usuário com email', () => {
    expect(() => User.create('joao@gmail', faker.internet.password())).toThrowError(
      'Invalid email'
    );
  });
  test('Deve verificar se a senha informada está correta para o usuário', () => {
    const user = User.create(faker.internet.email(), faker.internet.password());
    const isValidPassword = user.validatePassword('1234');
    expect(isValidPassword).toBeFalsy();
  });
  test('Deve criar um novo usuário', () => {
    const password = faker.internet.password();
    const user = User.create(faker.internet.email(), password);
    const isValidPassword = user.validatePassword(password);
    expect(isValidPassword).toBeTruthy();
  });
  test('Deve criar um usuário a partir do banco de dados', () => {
    const user = User.buildExistingUser(
      faker.internet.email(),
      'bd2615764cdf90d3f7467d0de0ca5e5cc87eaedf03471a462c354767e8ded32658a99116d16a2d45dca94a723d3535019125459b9dbaeb53960d8c11283289c2',
      'salt'
    );
    const isValidPassword = user.validatePassword('abc123');
    expect(isValidPassword).toBeTruthy();
  });
});
