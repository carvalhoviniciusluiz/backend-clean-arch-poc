import { randomUUID } from 'crypto';
import { Email, Password } from "../value-object";

// Aggregate Root
export class User {
  public id = randomUUID()

  private constructor(
    readonly email: Email,
    readonly password: Password
  ) {}

  static create(email: string, password: string) {
    return new User(new Email(email), Password.create(password));
  }

  static buildExistingUser(email: string, hash: string, salt: string) {
    return new User(new Email(email), new Password(hash, salt));
  }

  validatePassword(password: string) {
    return this.password.validate(password);
  }
}
