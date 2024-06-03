export interface IInventoryItem {
    _id: string;
    product_id: string;
    quantity: number;
  }
  
  export interface IInventory {
    _id: string;
    branch_office_id: string;
    inventory: IInventoryItem[];
  }