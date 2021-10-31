import { PasswordHash } from './password-hash';

const main = async () => {
  if (process.argv.length !== 3) {
    console.log('Usage: npm run password-hash <password>');
    return;
  }

  const passwordHash = await PasswordHash.getPasswordHash(process.argv[2]);
  console.log('PasswordHash: ', passwordHash);
};

main();

