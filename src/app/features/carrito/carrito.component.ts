import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../core/sales/sales.service';
import { CreateSaleDto, SaleArrayDto } from '../../core/sales/createSale.dto';
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
  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadCart();
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}'); // Obtener userProfile del local storage
    this.branchOfficeId = userProfile.branch_id;
    this.seller = userProfile.name;
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

  checkout(): void{
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

    this.salesService.create(createSaleDto)
      .then(response => {
        console.log('Sale created successfully:', response);
        this.clearCart();
      })
      .catch(error => {
        console.error('Error creating sale:', error);
      });
  }
}
