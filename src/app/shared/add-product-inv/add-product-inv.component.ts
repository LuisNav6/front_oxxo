import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-product-inv',
  templateUrl: './add-product-inv.component.html',
  styleUrls: ['./add-product-inv.component.css']
})
export class AddProductInvComponent {
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
