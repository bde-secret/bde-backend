import { UserVerify } from 'src/api/login/login.model';
import { LoginTester } from 'src/api/login/login.tester';

describe('# Login Test', () => {
  beforeAll((done) => {
    done();
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

  afterAll((done) => {
    done();
  });
});
