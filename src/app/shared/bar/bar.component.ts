import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Asegúrate de importar el servicio de autenticación desde la ruta correcta

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent {
  rol: string = "soporte";
  usuario: string = "Usuario";
  isSidebarToggled: boolean = false;

  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
  }

  logout() {
    this.authService.logout();
  }
}
