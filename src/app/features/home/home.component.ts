import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../core/inventory/inventory.service';
import { IInventory } from '../../core/inventory/inventory';
import { ProductService } from 'src/app/core/products/products.service';
import { IProduct } from 'src/app/core/products/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: IProduct[] = []; // Array para almacenar los datos de los productos
  branchOfficeId: string | null = null;
  quantities: { [productId: string]: number } = {};

  constructor(private inventoryService: InventoryService, private productService: ProductService) { }

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
          this.quantities[item.product_id] = item.quantity;
          console.log(this.quantities);

          // Convertir el precio si es un objeto
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

  addToCart(product: IProduct) {
    const productId = product._id;
    const availableQuantity = this.quantities[productId];

    if (availableQuantity <= 0) {
      alert(`No hay inventario disponible para el producto ${product.name}`);
      return;
    }

    let cart: { id: string, price: number | String }[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartQuantity = cart.filter(item => item.id === productId).length;

    if (cartQuantity >= availableQuantity) {
      alert(`No hay suficiente inventario para el producto ${product.name}`);
      return;
    }

    // Convertir el precio si es un objeto
    if (typeof product.price === 'object' && product.price !== null) {
      const priceObject = product.price as { $numberDecimal: string };
      if (priceObject.$numberDecimal) {
        product.price = parseFloat(priceObject.$numberDecimal).toFixed(2); // Convierte a número
      }
    }

    cart.push({ id: productId, price: product.price });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
