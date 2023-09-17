import { Email } from "./email";
import { Password } from "./password";

export class User {
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
