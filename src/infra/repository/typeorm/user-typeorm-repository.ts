import { Repository } from 'typeorm';
import type { CreateUserRepository, FindOneUserByEmailRepository, UserRepository } from '~/application/repository';
import { User } from '~/domain/entity';
import { Email } from '~/domain/value-object';
import { UserTypeOrm } from '~/infra/database/typeorm/entity';

export class UserTypeOrmRepository implements UserRepository
{
  constructor(private readonly userRepository: Repository<UserTypeOrm>) {}

  private mapToUser(row: any): User {
    const user = User.buildExistingUser(
      row.userEmail,
      row.userPasswordHashed,
      row.userSalt
    );
    user.id = row.userId;
    return user;
  }

  isValidEmail(input: { email: string }) {
    const email = new Email(input.email);
    return email.getValue();
  }

  async getByEmail(
    input: FindOneUserByEmailRepository.Input
  ): Promise<FindOneUserByEmailRepository.Output> {
    const email = this.isValidEmail(input);
    const query = `
      SELECT
        users.id AS userId,
        users.email AS userEmail,
        users.password_hashed AS userPasswordHashed,
        users.salt AS userSalt
      FROM users
      WHERE users.email = $1;
    `;
    try {
      const [found] = await this.userRepository.query(query, [email]);
      if (found) {
        return this.mapToUser(found);
      }
    } catch (error: any) {
      throw new Error(`Failed: ${error.message}`);
    }
  }

  async insert(
    input: CreateUserRepository.Input
  ): Promise<CreateUserRepository.Output> {
    const entity = {
      id: input.id,
      email: input.email.getValue(),
      passwordHashed: input.password.getValue(),
      salt: input.password.getSalt()
    };
    const { generatedMaps } = await this.userRepository.insert(entity);
    const [{ createdAt, updatedAt }] = generatedMaps;
    return {
      id: entity.id,
      email: entity.email,
      createdAt,
      updatedAt
    };
  }
}
