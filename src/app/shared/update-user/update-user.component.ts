import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  usuario = {
    nombre: 'Nombre',
    apellido: 'Apellido',
    email: 'x@email.com',
    tel: '1234567890',
    rol: 'admin'

  };
  
    UsuarioForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      apellido: [this.usuario.apellido, Validators.required],
      email: [this.usuario.email, Validators.required],
      tel: [this.usuario.tel, Validators.required],
      rol: [this.usuario.rol, Validators.required]
    });
  
    constructor(private fb: FormBuilder) {}
  
    onSubmit(): void {
      console.log(this.UsuarioForm.value);
    }
}
