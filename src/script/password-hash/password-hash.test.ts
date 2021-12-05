import { PasswordHash } from '@script/password-hash/password-hash';

describe('# Password Hash', () => {
  test('Should verify the hash of a simple password', async () => {
    const password = 'alois';
    const hash = await PasswordHash.getPasswordHash(password);

    const bcryptResult = await PasswordHash.verifyHash(password, hash);
    expect(bcryptResult).toBe(true);
  });

  test('Should fail to verify the hash of an other password', async () => {
    const password = 'alois';
    const otherPassword = 'other';

    const hash = await PasswordHash.getPasswordHash(password);
    const bcryptResult = await PasswordHash.verifyHash(otherPassword, hash);
    expect(bcryptResult).toBe(false);
  });
});
