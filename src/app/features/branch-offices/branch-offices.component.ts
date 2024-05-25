import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-branch-offices',
  templateUrl: './branch-offices.component.html',
  styleUrls: ['./branch-offices.component.css']
})
export class BranchOfficesComponent {

  sucursales = [
    {nombre: 'Sucursal 1', location: 'Av. Del sol #323 Col. Centro', CP: 12345, RFC: 'fjvn31123', tel: 6678912345, admin: 'admin'},
    {nombre: 'Sucursal 2', location: 'Av. Del sol #323 Col. Centro', CP: 12345, RFC: 'fjvn31123', tel: 6678912345, admin: 'admin'},
    {nombre: 'Sucursal 3', location: 'Av. Del sol #323 Col. Centro', CP: 12345, RFC: 'fjvn31123', tel: 6678912345, admin: 'admin'}
  ];

  constructor(private router: Router) { }

  crearSucursal() {
    this.router.navigate(['/new-branch']);
  }
  
  actualizarSucursal() {
    this.router.navigate(['/update-branch']);
  }

}
