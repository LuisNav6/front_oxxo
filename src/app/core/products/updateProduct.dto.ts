export class UpdateProductDto {
    name?: string;
    price?: number;
    description?: string;
    photo?: File; // Optional File object for photo upload
  }