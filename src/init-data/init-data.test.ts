import { PERMISSION } from 'src/api/permission/permission.model';
import { RoleModel } from 'src/api/role/role.model';
import { globalTester } from './global.tester';

describe('# Start init data', () => {
  let adminRole: RoleModel;

  test('# Truncate all table', async () => {
    await globalTester.truncateTable();
  });

  test('# Create an admin role', async () => {
    adminRole = await globalTester.spawnRole('admin', [PERMISSION.ROLE_MANAGEMENT]);
  });

  test('# Create an admin user', async () => {
    await globalTester.spawnUser('alois', 'alois', adminRole.id);
  });

  test('# Create a user without role', async () => {
    await globalTester.spawnUser('Jeremy', 'alois');
  });
});
