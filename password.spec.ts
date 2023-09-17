import { Password } from "./password";

describe('password', () => {
  const SALT = 'salt';
  const PASSWORD = '1234';
  const ANY_SALT = 'any_salt';
  const ANY_PASSWORD = '4321';
  const HASH =
    '83e4b603691595cae1e33250a0400e31e7d1656aa90a8b79cdb2e9029373e3d34989c7beceae94cb16cbec521e5c825ab766fba8a8974b55e30b8bda420ad6cc';
  test('Deve ser uma senha inválida', async () => {
    const password = Password.create(PASSWORD, SALT);
    expect(password.getSalt()).toBe(SALT);
    expect(password.validate(ANY_PASSWORD)).toBeFalsy();
  });
  test('Deve ser inválido e o salt da senha for diferente', async () => {
    const password = new Password(HASH, ANY_SALT);
    expect(password.validate(PASSWORD)).toBeFalsy();
  });
  test('Deve ser uma senha válida', async () => {
    const password = Password.create(PASSWORD, SALT);
    expect(password.validate(PASSWORD)).toBeTruthy();
  });
  test('Deve ser um hash com salt válido', async () => {
    const password = new Password(HASH, SALT);
    expect(password.getValue()).toBe(HASH);
    expect(password.validate(PASSWORD)).toBeTruthy();
  });
});
