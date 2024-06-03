import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../../core/inventory/inventory.service';
import { IInventory } from '../../core/inventory/inventory';
import { ProductService } from 'src/app/core/products/products.service';
import { IProduct } from 'src/app/core/products/products';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit{
  products: IProduct[] = []; // Array para almacenar los datos de los productos
  branchOfficeId: string | null = null;
  quantities: any[] = [];

  constructor(private router: Router, private inventoryService: InventoryService, private productService: ProductService ) { }

  ngOnInit(): void {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}'); // Obtener userProfile del local storage
    this.branchOfficeId = userProfile.branch_id; // Obtener branch_office_id del userProfile
    if (this.branchOfficeId) {
      this.loadInventory(this.branchOfficeId);
    } else {
      console.error('No branch_office_id found in local storage');
    }
  }
  

  async loadInventory(id: string) {
    try {
      const inventories: IInventory[] = await this.inventoryService.findAllByBranchId(id);
      console.log(inventories);

      for (const inventory of inventories) {
        for (const item of inventory.inventory) {
          const product: IProduct = await this.productService.findById(item.product_id);
          this.quantities.push(item.quantity);
          console.log(this.quantities);
          if (typeof product.price === 'object' && product.price !== null) {
            const priceObject = product.price as { $numberDecimal: string };
            if (priceObject.$numberDecimal) {
              product.price = parseFloat(priceObject.$numberDecimal).toFixed(2); // Convierte a número
            }
          }
          this.products.push(product);
        }
      }

      console.log('Products:', this.products);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
    }
  }
  
  addProducto() {
    this.router.navigate(['/add-product-inventory']);
  }
  
  actualizarProducto(id: string, quantities: any) {
    console.log(id, quantities);
    this.router.navigate(['/update-product-inventory'], { state: { id: id, quantities: quantities } });
  }
  
  
}
