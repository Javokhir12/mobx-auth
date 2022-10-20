import { makeAutoObservable } from 'mobx';
import { LoginRequest } from '../models/request';
import { AuthService } from '../services/auth.service';

export const AUTH_STORAGE_KEY = '@mobx/auth/token';

export class AuthStore {
  private authenticated = false;

  constructor(private readonly authService: AuthService) {
    makeAutoObservable(this);
    this.authenticated = !!this.getAccessToken();
  }

  async login(request: LoginRequest) {
    try {
      const tokenPayload = await this.authService.login(request);
      window.sessionStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(tokenPayload?.access_token)
      );
      this.isAuthenticated = true;
    } catch (error) {
      console.log(error);
      this.isAuthenticated = false;
    }
  }

  get isAuthenticated(): boolean {
    return this.authenticated;
  }

  set isAuthenticated(auth: boolean) {
    this.authenticated = auth;
  }

  getAccessToken() {
    try {
      const token = window.sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (!token) return null;

      return JSON.parse(token) as string;
    } catch (error) {
      console.log(error);

      return null;
    }
  }
}
