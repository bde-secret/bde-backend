import { Role } from 'src/orm/roles';
import { globalTester } from './global.tester';

describe('# Start init data', () => {
  let adminRole: Role;

  test('# Truncate all table', async () => {
    await globalTester.truncateTable();
  });

  test('# Create an admin role', async () => {
    adminRole = await globalTester.spawnRole('admin', ['createRole']);
  });

  test('# Create an admin user', async () => {
    await globalTester.spawnUser('alois', 'alois', adminRole.id);
  });

  test('# Create a user without role', async () => {
    await globalTester.spawnUser('Jeremy', 'alois');
  });
});
