export interface ISales {
    products: SaleArrayDto[];
    branch_office_id: string;
    sale_date: string;
    total: string;
    seller: string;
  }
  
  export interface SaleArrayDto {
    product_id: string;
    quantity: number;
  }
  