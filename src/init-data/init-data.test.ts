import { RoleService } from 'src/api/role/role.service';
import { Role } from 'src/orm/roles';
import { User } from 'src/orm/user';
import { PasswordHash } from 'src/script/password-hash/password-hash';

describe('# Start init data', () => {
  let adminRole: Role;

  beforeAll((done) => {
    done();
  });

  test('# Truncate all table', async () => {
    await User.truncate();
    await Role.truncate();
  });

  test('# Create an admin role', async () => {
    adminRole = await RoleService.createRole({ roleName: 'admin', permissions: { permissions: ['createRole'] } });
  });

  test('# Create an admin user', async () => {
    await User.create({
      userName: 'alois',
      passwordHash: await PasswordHash.getPasswordHash('alois'),
      roleId: adminRole.id,
    });
  });

  afterAll((done) => {
    done();
  });
});
