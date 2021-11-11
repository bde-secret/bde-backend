import request from 'supertest';
import { app } from 'src/index';
import { UserVerify } from 'src/api/login/login.model';

export class LoginTester {
  public static async checkLogin(userVerify: UserVerify, expectedStatusCode: number = 200, errorMessage: string = '') {
    const response = await request(app).post('/login').send(userVerify);
    expect(response.statusCode).toBe(expectedStatusCode);
    if (expectedStatusCode !== 200) {
      expect((response.error as any).text).toBe(errorMessage);
    }
    return response;
  }
}
