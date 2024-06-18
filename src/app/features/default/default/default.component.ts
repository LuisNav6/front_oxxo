import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  constructor(private router: Router) {}

  title = 'Bienvenido a Nuestra Plataforma';
  description = 'Descubra las funciones y servicios que ofrecemos para su éxito.';
  features: { icon: string; title: string; description: string; color: string; }[] | undefined;

  ngOnInit() {
    this.features = [
      { icon: 'pi pi-users', title: 'Gestión de Usuarios', description: 'Administre usuarios y permisos fácilmente.', color: '#38A3CB' },
      { icon: 'pi pi-chart-line', title: 'Análisis de datos', description: 'Obtenga información detallada y tome decisiones informadas.', color: '#4C87A4' },
      { icon: 'pi pi-shield', title: 'Distribución y escalabilidad', description: 'Crezca cuanto y cuando usted quiera.', color: '#5FC0C9' }
    ];
  }

  redirect() {
    this.router.navigate(['/login']);
  }
}
