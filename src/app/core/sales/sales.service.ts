import { Injectable } from '@angular/core';
import axios from 'axios';
import { CreateSaleDto } from './createSale.dto';
import { ISales } from './sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private baseUrl: string = 'http://localhost:3000/sales';

  constructor() {}

  async findAll(): Promise<ISales[]> {
    try {
      const response = await axios.get<ISales[]>(this.baseUrl);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async findOne(id: string): Promise<ISales> {
    try {
      const response = await axios.get<ISales>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async create(createSaleDto: CreateSaleDto): Promise<ISales> {
    try {
      const response = await axios.post<ISales>(this.baseUrl, createSaleDto);
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
