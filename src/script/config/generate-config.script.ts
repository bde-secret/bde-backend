import crypto from 'crypto';
import fs from 'fs';
import { Logger } from '@logger/logger';

function generateConfigFile(fileName: string = 'src/.config.ts') {
  if (fs.existsSync(fileName)) {
    Logger.message('File already exist');
    return;
  }

  const config = {
    secretToken: crypto.randomBytes(64).toString('hex'),
  };

  const result = `export const config = ${JSON.stringify(config)}`;
  fs.writeFile(fileName, result, (err) => {
    if (err) return Logger.error('Unable to write file');
    return Logger.success('Config file generated');
  });
};

const main = () => {
  if (process.argv.length !== 3) {
    generateConfigFile();
    return;
  }

  generateConfigFile(process.argv[2]);
  return;
};

main();
