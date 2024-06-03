import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/users/users';
import { UsersService } from 'src/app/core/users/users.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{

  usuarios: IUser [] = [];

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers(){
    this.usuarios = await this.userService.findAll();
    console.log(this.usuarios);
  }

  crearUsuario() {
    this.router.navigate(['/signup']);
  }
  
  actualizarUsuario(user: IUser) {
    this.router.navigate(['/update-user'], { state: { user } });
  }

  async eliminarUsuario(id:string){
    await this.userService.delete(id);
    location.reload();
  }

}
