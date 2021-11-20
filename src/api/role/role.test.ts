import { globalTester } from 'src/init-data/global.tester';
import { LoginTester } from '../login/login.tester';
import { RoleTester } from './role.tester';

describe('# Role Test', () => {
  let adminUser: { token: string; };
  let normalUser: { token: string };

  it('> Setup', async () => {
    await globalTester.truncateTable();
    const adminRole = await globalTester.spawnRole('admin', ['createRole']);
    const menberRole = await globalTester.spawnRole('membre', []);
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
    const permissions = ['createRole'];
    await RoleTester.checkCreateRole(adminUser, { roleName: 'admin2', permissions });
  });
});
