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
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'update-user', component: UpdateUserComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'new-product', component: NewProductComponent},
  { path: 'update-product', component: UpdateProductComponent },
  { path: 'home', component: HomeComponent},
  { path: 'productos', component: ProductsComponent},
  { path: 'sucursales', component: BranchOfficesComponent},
  { path: 'inventario', component: InventoryComponent},
  { path: 'reportes', component: ReportsComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'carrito', component: CarritoComponent},
  {path: 'add-product-inventory', component: AddProductInvComponent},
  {path: 'update-product-inventory', component: UpdateProductInvComponent},
  {path: 'new-branch', component: NewBranchComponent},
  {path: 'update-branch', component: UpdateBranchComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
