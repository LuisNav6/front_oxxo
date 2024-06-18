import { Injectable } from '@angular/core';
import axios from 'axios';
import { IUser } from './users';
import { CreateUserDto } from './createUser.dto';
import { UpdateUserDto } from './updateUser.dto';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = 'https://back-oxxo.onrender.com/users';

  constructor() {}

  async findAll(): Promise<IUser[]> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get<IUser[]>(this.baseUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async findOne(id: string): Promise<IUser> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get<IUser>(`${this.baseUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post<IUser>(`${this.baseUrl}/create-account`, createUserDto, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put<IUser>(`${this.baseUrl}/${id}`, updateUserDto, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(id: string): Promise<IUser> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.delete<IUser>(`${this.baseUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): never {
    console.error('API call error', error);
    throw error;
  }
}
