import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {

  productoForm = this.fb.group({
    nombre: ['', Validators.required],
    precio: ['', Validators.required],
    descripcion: ['', Validators.required],
    foto: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    console.log(this.productoForm.value);
  }
}
