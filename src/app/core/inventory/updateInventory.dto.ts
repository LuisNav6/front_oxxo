export class UpdateInventoryDto {
  branch_office_id?:string;
    inventory?: UpdateInventoryItemDto[];
  }
  
  export class UpdateInventoryItemDto {
    product_id?: string;
    quantity?: number;
  }