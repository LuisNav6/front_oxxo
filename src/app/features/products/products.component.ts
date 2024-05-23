import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  productos = [
    {nombre: 'Producto 1', precio: 100, descripcion: 'Descripción del producto 1', photo: 'hola.png'},
    {nombre: 'Producto 2', precio: 200, descripcion: 'Descripción del producto 2', photo: 'hola.png'},
    {nombre: 'Producto 2', precio: 200, descripcion: 'Descripción del producto 2', photo: 'hola.png'}
  ];

  constructor(private router: Router) { }

  crearProducto() {
    this.router.navigate(['/new-product']);
  }
  
  actualizarProducto() {
    this.router.navigate(['/update-product']);
  }
}
