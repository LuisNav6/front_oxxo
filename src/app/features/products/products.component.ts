import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../core/products/products.service'; // Importa el servicio ProductService
import { IProduct } from 'src/app/core/products/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productos?: IProduct[];

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() { 
    try {
      this.productos = await this.productService.findAll();
      console.log(this.productos);
  
      // Convertir el precio si es un objeto
      this.productos.forEach(product => {
        if (typeof product.price === 'object' && product.price !== null) {
          const priceObject = product.price as { $numberDecimal: string };
          if (priceObject.$numberDecimal) {
            product.price = parseFloat(priceObject.$numberDecimal).toFixed(2); // Convierte a número
          }
        }
      });
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }
  

  crearProducto() {
    this.router.navigate(['/new-product']);
  }
  
  actualizarProducto(producto: IProduct) {
    this.router.navigate(['/update-product'], { state: { producto } });
  }
  async deleteProducto(id: string){
    await this.productService.delete(id);
    location.reload();
  }
}
