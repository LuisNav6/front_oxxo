export class CreateInventoryDto {
    branch_office_id?: string;
    inventory?: CreateInventoryItemDto[];
  }
  
  export class CreateInventoryItemDto {
    product_id?: string;
    quantity?: number;
  }