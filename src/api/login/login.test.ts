import { UserVerify } from '@api/login/login.model';
import { LoginTester } from '@api/login/login.tester';
import { globalTester } from 'src/init-data/global.tester';
import { PERMISSION } from '@api/permission/permission.model';

describe('# Login Test', () => {
  it('> startup', async () => {
    await globalTester.truncateTable();
    const adminRole = await globalTester.spawnRole('admin', [PERMISSION.ROLE_MANAGEMENT]);
    await globalTester.spawnUser('alois', 'alois', adminRole.id);
  });

  it('> Try to login without a login info', async () => {
    await LoginTester.checkLogin({ userName: null, password: null } as unknown as UserVerify, 404, '\"userName\" must be a string');
  });

  it('> Try to login without a userName', async () => {
    await LoginTester.checkLogin({ userName: null, password: 'test' } as unknown as UserVerify, 404, '\"userName\" must be a string');
  });

  it('> Try to login without a password', async () => {
    await LoginTester.checkLogin({ userName: 'alois', password: null } as unknown as UserVerify, 404, '\"password\" must be a string');
  });

  it('> Try to login with a incorect name', async () => {
    await LoginTester.checkLogin({ userName: 'alois50', password: 'coucou' }, 404, 'User or Password incorrect!');
  });

  it('> Try to login with a incorect password', async () => {
    await LoginTester.checkLogin({ userName: 'alois', password: 'coucou' }, 404, 'User or Password incorrect!');
  });

  it('> Try to login with correct information', async () => {
    await LoginTester.checkLogin({ userName: 'alois', password: 'alois' }, 200);
  });

  it('> Get Me information with incorrect JWT', async () => {
    const user = { token: 'coucou' };
    await LoginTester.checkMe(user, 403);
  });

  it('> Get Me information', async () => {
    const response = await LoginTester.checkLogin({ userName: 'alois', password: 'alois' }, 200);
    const user = { token: response.body.accessToken };
    const responseMe = await LoginTester.checkMe(user);
    expect(responseMe.body.userName).toBe('alois');
    expect(responseMe.body.roleName).toBe('admin');
  });
});
