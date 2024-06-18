import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../core/inventory/inventory.service';
import { IInventory } from '../../core/inventory/inventory';
import { ProductService } from 'src/app/core/products/products.service';
import { IProduct } from 'src/app/core/products/products';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  branchOfficeId: string | null = null;
  quantities: { [productId: string]: number } = {};
  searchTerm: string = '';

  constructor(private inventoryService: InventoryService, private productService: ProductService) { }

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
      console.log(inventories);

      for (const inventory of inventories) {
        for (const item of inventory.inventory) {
          const product: IProduct = await this.productService.findById(item.product_id);
          this.quantities[item.product_id] = item.quantity;
          console.log(this.quantities);

          if (typeof product.price === 'object' && product.price !== null) {
            const priceObject = product.price as { $numberDecimal: string };
            if (priceObject.$numberDecimal) {
              product.price = parseFloat(priceObject.$numberDecimal).toFixed(2);
            }
          }
          this.products.push(product);
        }
      }

      this.products = this.products.filter(product => this.quantities[product._id] > 0);
      this.filteredProducts = this.products;
      console.log('Products:', this.products);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
    }
  }

  searchProduct(event: Event) {
    event.preventDefault();
    if (!this.searchTerm) {
      this.filteredProducts = this.products;
      return;
    }

    const results = this.products.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (results.length > 0) {
      this.filteredProducts = results;
    } else {
      Swal.fire({
        title: 'Producto no encontrado',
        text: `No se encontró ningún producto con el nombre "${this.searchTerm}"`,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  }

  addToCart(product: IProduct) {
    const productId = product._id;
    const availableQuantity = this.quantities[productId];

    if (availableQuantity <= 0) {
      Swal.fire({
        title: `Excedes la cantidad disponible de ${product.name}!`,
        text: 'Estás al límite.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
      return;
    }

    let cart: { id: string, price: number | string }[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartQuantity = cart.filter(item => item.id === productId).length;

    if (cartQuantity >= availableQuantity) {
      Swal.fire({
        title: `Excedes la cantidad disponible de ${product.name}!`,
        text: 'Estás al límite.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
      return;
    }

    if (typeof product.price === 'object' && product.price !== null) {
      const priceObject = product.price as { $numberDecimal: string };
      if (priceObject.$numberDecimal) {
        product.price = parseFloat(priceObject.$numberDecimal).toFixed(2);
      }
    }

    cart.push({ id: productId, price: product.price });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
