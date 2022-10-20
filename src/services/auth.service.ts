import { LoginRequest } from '../models/request';

export class AuthService {
  async login(request: LoginRequest) {
    try {
      console.log(`Logging in user: ${JSON.stringify(request)}`);
      const response = await Promise.resolve({
        access_token: 'wg46kmau.wt872msjsj.17qypwy',
      });

      return response;
    } catch (error) {
      console.log(error);

      throw error as Error;
    }
  }
}
