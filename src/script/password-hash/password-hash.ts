import { hash, compare } from 'bcrypt';

export class PasswordHash {
  public static async getPasswordHash(plainPassword: string): Promise<string> {
    const result = await hash(plainPassword, 10);
    return result;
  }

  public static async verifyHash(plainPassword: string, hash: string): Promise<boolean> {
    return compare(plainPassword, hash);
  }
}
