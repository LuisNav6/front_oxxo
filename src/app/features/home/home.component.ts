import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products = [
    { name: 'Producto 1', description: 'Descripción del producto 1', price: 100, photo: 'https://via.placeholder.com/150' },
    { name: 'Producto 2', description: 'Descripción del producto 2', price: 200, photo: 'https://via.placeholder.com/150' },
    { name: 'Producto 3', description: 'Descripción del producto 3', price: 300, photo: 'https://via.placeholder.com/150' },
    { name: 'Producto 4', description: 'Descripción del producto 4', price: 300, photo: 'https://via.placeholder.com/150' },
    { name: 'Producto 5', description: 'Descripción del producto 5', price: 300, photo: 'https://via.placeholder.com/150' },
    { name: 'Producto 6', description: 'Descripción del producto 6', price: 300, photo: 'https://via.placeholder.com/150' },
    { name: 'Producto 4', description: 'Descripción del producto 4', price: 300, photo: 'https://via.placeholder.com/150' },
    { name: 'Producto 5', description: 'Descripción del producto 5', price: 300, photo: 'https://via.placeholder.com/150' },
    { name: 'Producto 6', description: 'Descripción del producto 6', price: 300, photo: 'https://via.placeholder.com/150' }

  ];

  constructor() { }

  ngOnInit(): void { }
}
