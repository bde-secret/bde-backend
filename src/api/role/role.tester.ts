import request from 'supertest';
import { app } from 'src/index';

export class RoleTester {
  // TODO: Fix
  public static async checkCreateRole(user: { token: string }, expectedStatusCode: number = 200) {
    const response = await request(app).get('/me').set({ Authorization: `Bearer ${user.token}` }).send();
    expect(response.statusCode).toBe(expectedStatusCode);
    return response;
  };
}
