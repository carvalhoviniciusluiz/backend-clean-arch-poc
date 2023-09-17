import { UUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { DataSource, Repository } from 'typeorm';
import { UserTypeOrm } from '~/infra/database/typeorm/entity';
import { UserTypeOrmRepository } from './user-typeorm-repository';
import { UserSchema } from '~/infra/database/typeorm/schema';
import { User } from '~/domain/entity';
describe('UserTypeOrmRepository', () => {
  let dataSource: DataSource;
  let userRepository: Repository<UserTypeOrm>;
  let userTypeOrmRepository: UserTypeOrmRepository;
  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [UserSchema]
    });
    await dataSource.initialize();
    userRepository = dataSource.getRepository(UserTypeOrm);
    userTypeOrmRepository = new UserTypeOrmRepository(userRepository);
  });
  describe('insert', () => {
    it('Deve inserir os dados do user no banco de dados', async () => {
      const user = User.create(faker.internet.email(), faker.internet.password());
      await userTypeOrmRepository.insert(user);
      const userFound = await userRepository.findOneBy({ id: user.id });
      expect(userFound!.id).toBe(user.id);
      expect(userFound!.email).toBe(user.email.getValue());
    });
  });
  describe('getByEmail', () => {
    const email = faker.internet.email();
    const id = faker.string.uuid() as UUID;
    const passwordHashed =
      '12d2b0d4c75f8f0efdb81350c43f3340dff6bf8f73415b4c395c7fb88c643ef91cf65fc3c104b446f8e5c3fbe521d1e4f04ac4a3b7f30bd9a673749252310b4e';
    const salt = '2ecd5e5f44af263ca53409670def9069d4f763b8';
    beforeAll(async () => {
      await userRepository.query('DELETE FROM users;');
      const user = User.buildExistingUser(email, passwordHashed, salt);
      user.id = id;
      await userTypeOrmRepository.insert(user);
    });
    test('Deve retornar erro de email inválido', async () => {
      const promise1 = userTypeOrmRepository.getByEmail({
        email: null as any
      });
      const promise2 = userTypeOrmRepository.getByEmail({
        email: 'abc' as any
      });
      await expect(promise1).rejects.toThrowError('Invalid email');
      await expect(promise2).rejects.toThrowError('Invalid email');
    });
    it('Deve devolter um array vazio', async () => {
      const output = await userTypeOrmRepository.getByEmail({
        email: faker.internet.email()
      });
      expect(output).toBeUndefined();
    });
    it('Deve buscar os dados do user pelo email correto', async () => {
      const userFound = await userTypeOrmRepository.getByEmail({ email });
      expect(userFound!.id).toBe(id);
      expect(userFound!.password.getValue()).toBe(passwordHashed);
      expect(userFound!.password.getSalt()).toBe(salt);
    });
    it('Deve lançar um erro na consulta', async () => {
      jest
        .spyOn(userRepository, 'query')
        .mockRejectedValueOnce(new Error('any_error'));
      const promise = userTypeOrmRepository.getByEmail({
        email: faker.internet.email()
      });
      await expect(promise).rejects.toThrowError('Failed: any_error');
    });
  });
});
