import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './shared/sign-up/sign-up.component';
import { NewProductComponent } from './shared/new-product/new-product.component';
import { UpdateProductComponent } from './shared/update-product/update-product.component';
import { HomeComponent } from './features/home/home.component';
import { CarritoComponent } from './features/carrito/carrito.component';
import { ProductsComponent } from './features/products/products.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { ReportsComponent } from './features/reports/reports.component';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { BranchOfficesComponent } from './features/branch-offices/branch-offices.component';
import { AddProductInvComponent } from './shared/add-product-inv/add-product-inv.component';
import { UpdateProductInvComponent } from './shared/update-product-inv/update-product-inv.component';
import { NewBranchComponent } from './shared/new-branch/new-branch.component';
import { UpdateBranchComponent } from './shared/update-branch/update-branch.component';
import { UpdateUserComponent } from './shared/update-user/update-user.component';
import { AuthGuard } from './core/auth/guard/auth.guard';
import { DefaultComponent } from './features/default/default/default.component';

const routes: Routes = [
  {path: 'default', component: DefaultComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: 'update-user', component: UpdateUserComponent, canActivate: [AuthGuard]},
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
  { path: 'new-product', component: NewProductComponent, canActivate: [AuthGuard]},
  { path: 'update-product', component: UpdateProductComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'productos', component: ProductsComponent, canActivate: [AuthGuard]},
  { path: 'sucursales', component: BranchOfficesComponent, canActivate: [AuthGuard]},
  { path: 'inventario', component: InventoryComponent, canActivate: [AuthGuard]},
  { path: 'reportes', component: ReportsComponent, canActivate: [AuthGuard]},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard]},
  {path: 'add-product-inventory', component: AddProductInvComponent, canActivate: [AuthGuard]},
  {path: 'update-product-inventory', component: UpdateProductInvComponent, canActivate: [AuthGuard]},
  {path: 'new-branch', component: NewBranchComponent, canActivate: [AuthGuard]},
  {path: 'update-branch', component: UpdateBranchComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/default', pathMatch: 'full' },
  { path: '**', redirectTo: '/default' }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
