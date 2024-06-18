import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../../core/inventory/inventory.service';
import { IInventory } from '../../core/inventory/inventory';
import { ProductService } from 'src/app/core/products/products.service';
import { IProduct } from 'src/app/core/products/products';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  products: IProduct[] = [];
  branchOfficeId: string | null = null;
  quantities: any[] = [];
  first: number = 0;
  rows: number = 10;

  constructor(private router: Router, private inventoryService: InventoryService, private productService: ProductService ) { }

  ngOnInit(): void {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    this.branchOfficeId = userProfile.branch_id;
    if (this.branchOfficeId) {
      this.loadInventory(this.branchOfficeId);
    } else {
      console.error('No branch_office_id found in local storage');
    }
  }

  async loadInventory(id: string) {
    try {
      const inventories: IInventory[] = await this.inventoryService.findAllByBranchId(id);
      for (const inventory of inventories) {
        for (const item of inventory.inventory) {
          const product: IProduct = await this.productService.findById(item.product_id);
          this.quantities.push(item.quantity);
          if (typeof product.price === 'object' && product.price !== null) {
            const priceObject = product.price as { $numberDecimal: string };
            if (priceObject.$numberDecimal) {
              product.price = parseFloat(priceObject.$numberDecimal).toFixed(2);
            }
          }
          this.products.push(product);
        }
      }
    } catch (error) {
      console.error('Error fetching product by ID:', error);
    }
  }

  addProducto() {
    this.router.navigate(['/add-product-inventory']);
  }

  actualizarProducto(id: string, quantities: any) {
    this.router.navigate(['/update-product-inventory'], { state: { id: id, quantities: quantities } });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  paginatedProducts() {
    return this.products.slice(this.first, this.first + this.rows);
  }
}
