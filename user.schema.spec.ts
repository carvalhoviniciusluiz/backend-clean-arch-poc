import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { UserTypeOrm } from './user.typeorm';
import { UserSchema } from './user.schema';

describe('UserSchema', () => {
  let dataSource: DataSource;
  let user: UserTypeOrm;
  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [UserSchema]
    });
    await dataSource.initialize();
    user = new UserTypeOrm(
      faker.string.uuid(),
      faker.internet.email(),
      'bd2615764cdf90d3f7467d0de0ca5e5cc87eaedf03471a462c354767e8ded32658a99116d16a2d45dca94a723d3535019125459b9dbaeb53960d8c11283289c2',
      'salt'
    );
  });
  test('Deve criar um novo usuário', async () => {
    const userRepository = dataSource.getRepository(UserTypeOrm);
    await userRepository.save(user);
    const userFound = await userRepository.findOneBy({
      id: user.id
    });
    expect(userFound).toEqual({
      id: user.id,
      email: user.email,
      passwordHashed: 'bd2615764cdf90d3f7467d0de0ca5e5cc87eaedf03471a462c354767e8ded32658a99116d16a2d45dca94a723d3535019125459b9dbaeb53960d8c11283289c2',
      salt: 'salt',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: null
    });
  });
  test('Deve usar softDelete para apagar o usuário', async () => {
    const userRepository = dataSource.getRepository(UserTypeOrm);
    await userRepository.save(user);
    await userRepository.softDelete(user.id);
    const [userFound] = await userRepository
      .createQueryBuilder('user')
      .where('user.deletedAt IS NOT NULL')
      .withDeleted()
      .getMany();
    expect(userFound!.deletedAt).toBeDefined();
  });
});
