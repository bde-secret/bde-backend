import { User } from 'src/orm/user';

describe('# Start init data', () => {
  test('# Truncate all table', async () => {
    await User.truncate();
  });

  test('# Create an admin user', async () => {
    await User.create({
      userName: 'alois',
      passwordHash: '$2b$10$5Dhg67SGYJ1FoWp2nPVFoe/StXEy4fPZVUavBY.9jEtksCwbUIgmu',
    });
  });
});
