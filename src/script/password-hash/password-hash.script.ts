import { Logger } from 'src/logger/logger';
import { PasswordHash } from 'src/script/password-hash/password-hash';

const main = async () => {
  if (process.argv.length !== 3) {
    Logger.message('Usage: npm run password-hash <password>');
    return;
  }

  const passwordHash = await PasswordHash.getPasswordHash(process.argv[2]);
  Logger.success(`PasswordHash: ${passwordHash}`);
};

main();

