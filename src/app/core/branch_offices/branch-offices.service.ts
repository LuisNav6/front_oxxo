import { Injectable } from '@angular/core';
import axios from 'axios';
import { IBranch_Office } from './branch_offices';
import { CreateBranchOfficeDto } from './createBranch_offices.dto';
import { UpdateBranchOfficeDto } from './updateBranch_offices.dto';


@Injectable({
  providedIn: 'root'
})
export class BranchOfficesService {
  private baseUrl: string = 'http://localhost:3000/branch-offices';

  constructor() {}

  async findAll(): Promise<IBranch_Office[]> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get<IBranch_Office[]>(this.baseUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async findOne(id: string): Promise<IBranch_Office> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get<IBranch_Office>(`${this.baseUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async findByBranchId(branchId: string): Promise<IBranch_Office[]> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get<IBranch_Office[]>(`${this.baseUrl}/branch/${branchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async create(createBranchOfficeDto: CreateBranchOfficeDto): Promise<IBranch_Office> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post<IBranch_Office>(this.baseUrl, createBranchOfficeDto, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(id: string, updateBranchOfficeDto: UpdateBranchOfficeDto): Promise<IBranch_Office> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put<IBranch_Office>(`${this.baseUrl}/${id}`, updateBranchOfficeDto, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(id: string): Promise<IBranch_Office> {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.delete<IBranch_Office>(`${this.baseUrl}/${id}`, {
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
