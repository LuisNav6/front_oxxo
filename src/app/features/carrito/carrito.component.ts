import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../core/sales/sales.service';
import { CreateSaleDto, SaleArrayDto } from '../../core/sales/createSale.dto';
import { IInventory } from 'src/app/core/inventory/inventory';
import { InventoryService } from 'src/app/core/inventory/inventory.service';
import { ProductService } from 'src/app/core/products/products.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  branchOfficeId?: string;
  seller?: string;
  quantities: { [productId: string]: number } = {};
  constructor(private salesService: SalesService, private inventoryService: InventoryService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCart();
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}'); // Obtener userProfile del local storage
    this.branchOfficeId = userProfile.branch_id;
    this.seller = userProfile.name;
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
          await this.productService.findById(item.product_id);
          this.quantities[item.product_id] = item.quantity; // Guardar la cantidad disponible
        }
      }

      console.log('Cantidad en inventario:', this.quantities);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
    }
  }

  loadCart(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productMap: { [id: string]: { price: number, quantity: number, subtotal: number } } = {};

    cart.forEach((item: { id: string, price: string }) => {
      const price = parseFloat(item.price); // Convertir el precio a número
      if (productMap[item.id]) {
        productMap[item.id].quantity++;
        productMap[item.id].subtotal += price;
      } else {
        productMap[item.id] = { price, quantity: 1, subtotal: price };
      }
    });

    this.cartItems = Object.keys(productMap).map(id => ({
      id,
      ...productMap[id]
    }));

    this.total = this.cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  }

  clearCart(): void {
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.total = 0;
  }

  async checkout(): Promise<void> {
    try {
      const sales: SaleArrayDto[] = this.cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }));

      const createSaleDto: CreateSaleDto = {
        products: sales,
        branch_office_id: this.branchOfficeId || "",
        sale_date: new Date().toISOString(),
        total: this.total.toFixed(2),
        seller: this.seller || ""
      };

      const response = await this.salesService.create(createSaleDto);
      console.log('Sale created successfully:', response);
      this.clearCart();
    } catch (error) {
      console.error('Error creating sale:', error);
    }
  }
}
