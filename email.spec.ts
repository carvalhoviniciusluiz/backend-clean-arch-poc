import { Email, InvalidEmailError } from "./email";


describe('email', () => {
  test('Deve ser um email inválido', () => {
    expect(() => new Email('test@')).toThrowError(
      new InvalidEmailError('Invalid email')
    );
    expect(() => new Email('@test')).toThrowError(
      new InvalidEmailError('Invalid email')
    );
    expect(() => new Email('t@t')).toThrowError(
      new InvalidEmailError('Invalid email')
    );
    expect(() => new Email('t@t.s')).toThrowError(
      new InvalidEmailError('Invalid email')
    );
  });
  test('Deve ser um email válido', () => {
    const value = 'test@test.net';
    const email = new Email(value);
    expect(email.getValue()).toBe(value);
  });
});
