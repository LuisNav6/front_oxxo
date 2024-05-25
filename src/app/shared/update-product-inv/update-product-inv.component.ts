import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-product-inv',
  templateUrl: './update-product-inv.component.html',
  styleUrls: ['./update-product-inv.component.css']
})
export class UpdateProductInvComponent {
  producto = {
    nombre: 'Nombre del producto',
    precio: 'Precio del producto',
    descripcion: 'Descripción del producto',
    foto: 'URL de la foto del producto'
  };
  
    productoForm = this.fb.group({
      nombre: [this.producto.nombre, Validators.required],
      precio: [this.producto.precio, Validators.required],
      descripcion: [this.producto.descripcion, Validators.required],
      foto: [this.producto.foto, Validators.required]
    });
  
    constructor(private fb: FormBuilder) {}
  
    onSubmit(): void {
      console.log(this.productoForm.value);
    }
}
