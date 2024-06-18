import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { UserPasswordLessDto } from './userPasswordLess.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'https://back-oxxo.onrender.com/auth',
      timeout: 1000,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public async login(userpasswordless: UserPasswordLessDto): Promise<any> {
    try {
      const response = await this.axiosClient.post('/login', userpasswordless);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  public async getProfile(token: string): Promise<any> {
    try {
      const response = await this.axiosClient.get('/protected', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any): void {
    console.error('Error en la petición HTTP:', error);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userProfile');
  }
}
