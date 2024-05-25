import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-branch',
  templateUrl: './update-branch.component.html',
  styleUrls: ['./update-branch.component.css']
})
export class UpdateBranchComponent {
  sucursal = {
    nombre: 'Nombre',
    location: 'location',
    CP: '12345',
    RFC: 'aaaa111111es1',
    tel: '1234567890',
    admin: 'admin1'

  };
  
    SucursalForm = this.fb.group({
      nombre: [this.sucursal.nombre, Validators.required],
      location: [this.sucursal.location, Validators.required],
      CP: [this.sucursal.CP, Validators.required],
      RFC: [this.sucursal.RFC, Validators.required],
      tel: [this.sucursal.tel, Validators.required],
      admin: [this.sucursal.admin, Validators.required]
    });
  
    constructor(private fb: FormBuilder) {}
  
    onSubmit(): void {
      console.log(this.SucursalForm.value);
    }

}
