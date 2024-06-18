import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/users/users';
import { UsersService } from 'src/app/core/users/users.service';
import Swal from 'sweetalert2';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  first: number = 0;
  rows: number = 10;
  usuarios: IUser[] = [];
  data: any;
  options: any;

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    this.usuarios = await this.userService.findAll();
    console.log(this.usuarios);
    this.setupChart();
  }

  crearUsuario() {
    this.router.navigate(['/signup']);
  }

  actualizarUsuario(user: IUser) {
    this.router.navigate(['/update-user'], { state: { user } });
  }

  async eliminarUsuario(id: string) {
    await this.userService.delete(id);
    Swal.fire({
      title: 'Usuario eliminado exitosamente!',
      text: `"`,
      icon: 'success',
      confirmButtonText: 'Cerrar'
    });
    this.loadUsers();
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  paginatedUsuarios() {
    return this.usuarios.slice(this.first, this.first + this.rows);
  }

  setupChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const roles = [...new Set(this.usuarios.map(user => user.rol))];
    const roleCounts = roles.map(role => this.usuarios.filter(user => user.rol === role).length);

    this.data = {
      labels: roles,
      datasets: [
        {
          data: roleCounts,
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400')
          ]
        }
      ]
    };

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }
}
