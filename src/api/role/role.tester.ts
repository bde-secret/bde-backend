import request from 'supertest';
import app from 'src/app';

export class RoleTester {
  public static async checkCreateRole(user: { token: string }, data: any, expectedStatusCode: number = 200) {
    const response = await request(app).post('/role').set({ Authorization: `Bearer ${user.token}` }).send(data);
    expect(response.statusCode).toBe(expectedStatusCode);
    if (expectedStatusCode === 200) {
      expect(response.body.roleName).toBe(data.roleName);

      if (data.permissions) {
        data.permissions.forEach((element: any) => {
          expect(response.body.permissions).toContain(element);
        });
      } else {
        expect(response.body.permissions).toBeNull();
      }
    }
    return response;
  };
}
