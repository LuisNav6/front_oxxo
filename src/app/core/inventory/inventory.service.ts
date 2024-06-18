import { Injectable } from '@angular/core';
import axios from 'axios';
import { CreateInventoryDto } from './createInventory.dto';
import { UpdateInventoryDto } from './updateInventory.dto';
import { IInventory } from './inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl: string = 'https://back-oxxo.onrender.com/inventory';

  constructor() {}

  async findAll(): Promise<IInventory[]> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get<IInventory[]>(this.baseUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async findOne(id: string): Promise<IInventory> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get<IInventory>(`${this.baseUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async findAllByBranchId(branchId: string): Promise<IInventory[]> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get<IInventory[]>(`${this.baseUrl}/branches/${branchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async findByBranchId(branchId: string): Promise<IInventory> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get<IInventory>(`${this.baseUrl}/branch/${branchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async create(createInventoryDto: CreateInventoryDto): Promise<IInventory> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post<IInventory>(this.baseUrl, createInventoryDto, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<IInventory> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put<IInventory>(`${this.baseUrl}/${id}`, updateInventoryDto, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(id: string): Promise<IInventory> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.delete<IInventory>(`${this.baseUrl}/${id}`, {
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
