// src/app/services/product.service.ts

import { Injectable } from '@angular/core';
import axios from 'axios';
import { CreateProductDto } from './createProduct.dto';
import { UpdateProductDto } from './updateProduct.dto';
import { IProduct, IProductResponse } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = 'http://localhost:3000/products';

  constructor() {}

  async findAll(): Promise<IProduct[]> {
    try {
      const response = await axios.get<IProduct[]>(this.baseUrl);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findById(id: string): Promise<IProduct> {
    try {
      const response = await axios.get<IProduct>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    try {
      const formData = new FormData();
      formData.append('name', createProductDto.name || "");
      formData.append('price', createProductDto.price?.toFixed(2) || "");
      formData.append('description', createProductDto.description || "");
      if (createProductDto.photo) {
        formData.append('photo', createProductDto.photo);
      }

      const response = await axios.post<IProductResponse>(this.baseUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data.product;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<IProduct> {
    try {
      const formData = new FormData();
      if (updateProductDto.name) formData.append('name', updateProductDto.name);
      if (updateProductDto.price) formData.append('price', updateProductDto.price.toFixed(2));
      if (updateProductDto.description) formData.append('description', updateProductDto.description);
      if (updateProductDto.photo) formData.append('photo', updateProductDto.photo);

      const response = await axios.put<IProductResponse>(`${this.baseUrl}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data.product;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    console.error('API call error', error);
    throw error;
  }
}
