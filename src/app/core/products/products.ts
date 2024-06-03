export interface IProduct {
    _id: string;
    name: string;
    price: string | number;
    description: string;
    photo: string;
  }
  
  export interface IProductResponse {
    product: IProduct;
  }