import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { HomeComponent } from './features/home/home.component';
import { CarritoComponent } from './features/carrito/carrito.component';
import { ProductsComponent } from './features/products/products.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { ReportsComponent } from './features/reports/reports.component';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { BranchOfficesComponent } from './features/branch-offices/branch-offices.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent},
  { path: 'productos', component: ProductsComponent},
  { path: 'sucursales', component: BranchOfficesComponent},
  { path: 'inventario', component: InventoryComponent},
  { path: 'reportes', component: ReportsComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'carrito', component: CarritoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
