import { pbkdf2Sync, randomBytes } from 'node:crypto';

export class Password {
  static ITERATIONS = 100;
  static KEY_LENGTH = 64;
  static DIGEST = 'sha512';

  constructor(
    private readonly value: string,
    private readonly salt: string
  ) {}

  getSalt() {
    return this.salt;
  }

  getValue() {
    return this.value;
  }

  static create(password: string, salt?: string): Password {
    const generatedSalt = salt || randomBytes(20).toString('hex');
    const key = pbkdf2Sync(
      password,
      generatedSalt,
      Password.ITERATIONS,
      Password.KEY_LENGTH,
      Password.DIGEST
    );
    return new Password(key.toString('hex'), generatedSalt);
  }

  validate(password: string) {
    const key = pbkdf2Sync(
      password,
      this.salt,
      Password.ITERATIONS,
      Password.KEY_LENGTH,
      Password.DIGEST
    );
    return this.value === key.toString('hex');
  }
}
