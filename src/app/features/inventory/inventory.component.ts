import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  productos = [
    {id: 1,nombre: 'Producto 1', precio: 100, descripcion: 'Descripción del producto 1', photo: 'hola.png',cantidad: 10},
    {id: 2,nombre: 'Producto 2', precio: 200, descripcion: 'Descripción del producto 2', photo: 'hola.png',cantidad: 20},
    {id: 3,nombre: 'Producto 3', precio: 200, descripcion: 'Descripción del producto 2', photo: 'hola.png',cantidad: 30}
  ];

  constructor(private router: Router) { }

  addProducto() {
    this.router.navigate(['/add-product-inventory']);
  }
  
  actualizarProducto() {
    this.router.navigate(['/update-product-inventory']);
  }
}
