import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { ProductsComponent } from './features/products/products.component';
import { NewProductComponent } from './shared/new-product/new-product.component';
import { UpdateProductComponent } from './shared/update-product/update-product.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'new-product', component: NewProductComponent},
  { path: 'update-product', component: UpdateProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
