import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  usuarios = [
    {nombre: 'nombre 1', apellido: "apellido 1", email: 'x@gmail.com', tel: '1234567890', rol: 'soporte', branch: 's1'},
    {nombre: 'nombre 2', apellido: "apellido 2", email: 'y@gmail.com', tel: '1234567890', rol: 'admin', branch: 's2'},
    {nombre: 'nombre 3', apellido: "apellido 3", email: 'z@gmail.com', tel: '1234567890', rol: 'cajero', branch: 's3'}
  ];

  constructor(private router: Router) { }

  crearUsuario() {
    this.router.navigate(['/signup']);
  }
  
  actualizarUsuario() {
    this.router.navigate(['/update-user']);
  }

}
