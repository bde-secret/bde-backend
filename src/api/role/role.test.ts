import { globalTester } from 'src/init-data/global.tester';
import { LoginTester } from 'src/api/login/login.tester';
import { PERMISSION } from 'src/api/permission/permission.model';
import { RoleModel } from './role.model';
import { RoleTester } from './role.tester';

describe('# Role Test', () => {
  let adminUser: { token: string; };
  let normalUser: { token: string };
  let menberRole: RoleModel;

  it('> Setup', async () => {
    await globalTester.truncateTable();
    const adminRole = await globalTester.spawnRole('admin', [PERMISSION.ROLE_MANAGEMENT]);
    menberRole = await globalTester.spawnRole('membre', []);
    await globalTester.spawnUser('alois', 'alois', adminRole.id);
    await globalTester.spawnUser('Jeremy', 'alois', menberRole.id);
    adminUser = await LoginTester.getUserToken('alois', 'alois');
    normalUser = await LoginTester.getUserToken('Jeremy', 'alois');
  });

  it('> Try to create a role without being connected', async () => {
    await RoleTester.checkCreateRole({ token: 'notConencted' }, { roleName: 'Coucou' }, 403);
  });

  it('> Try to create a role without  having the permissions to do it', async () => {
    await RoleTester.checkCreateRole(normalUser, { roleName: 'admin2' }, 403);
  });

  it('> Create a role without permissions', async () => {
    await RoleTester.checkCreateRole(adminUser, { roleName: 'admin2' });
  });

  it('> Create a role with permissions', async () => {
    const permissions = [PERMISSION.ROLE_MANAGEMENT];
    await RoleTester.checkCreateRole(adminUser, { roleName: 'admin2', permissions });
  });

  it('> Update role user when role does not exist', async () => {
    const permissions = [PERMISSION.ROLE_MANAGEMENT];
    await RoleTester.checkUpdateRole(adminUser, { id: 9999999999999999, roleName: 'normal2', permissions }, 404);
  });

  it('> Update normal role name and add role_management', async () => {
    const permissions = [PERMISSION.ROLE_MANAGEMENT];
    await RoleTester.checkUpdateRole(adminUser, { id: menberRole.id, roleName: 'normal2', permissions });
  });

  it('> Update normal role name with normal user', async () => {
    await RoleTester.checkUpdateRole(normalUser, { id: menberRole.id, roleName: 'normal', permissions: [] });
  });

  it('> Try to update normal role when you does not have the permissions', async () => {
    await RoleTester.checkUpdateRole(normalUser, { id: menberRole.id, roleName: 'normal' }, 403);
  });
});
