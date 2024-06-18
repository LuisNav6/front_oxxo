import { Injectable } from '@angular/core';
import axios from 'axios';
import { CreateSaleDto } from './createSale.dto';
import { ISales } from './sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private baseUrl: string = 'https://back-oxxo.onrender.com/sales';

  constructor() {}

  async findAll(): Promise<ISales[]> {
    try {
    const token = localStorage.getItem('jwtToken');
      const response = await axios.get<ISales[]>(this.baseUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async findOne(id: string): Promise<ISales> {
    try {
const token = localStorage.getItem('jwtToken');
      const response = await axios.get<ISales>(`${this.baseUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async findByBranchOffice(branch_office_id: string): Promise<ISales[]> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get<ISales[]>(`${this.baseUrl}/byBranchOffice/${branch_office_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async create(createSaleDto: CreateSaleDto): Promise<ISales> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post<ISales>(this.baseUrl, createSaleDto, {
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
