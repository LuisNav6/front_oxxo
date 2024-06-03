import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './shared/sign-up/sign-up.component';
import { ProductsComponent } from './features/products/products.component';
import { NewProductComponent } from './shared/new-product/new-product.component';
import { UpdateProductComponent } from './shared/update-product/update-product.component';
import { HomeComponent } from './features/home/home.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { CarritoComponent } from './features/carrito/carrito.component';
import { BarComponent } from './shared/bar/bar.component';
import { BranchOfficesComponent } from './features/branch-offices/branch-offices.component';
import { ReportsComponent } from './features/reports/reports.component';
import { AuthService } from './core/auth/auth.service';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { NewBranchComponent } from './shared/new-branch/new-branch.component';
import { UpdateBranchComponent } from './shared/update-branch/update-branch.component';
import { AddProductInvComponent } from './shared/add-product-inv/add-product-inv.component';
import { UpdateProductInvComponent } from './shared/update-product-inv/update-product-inv.component';
import { UpdateUserComponent } from './shared/update-user/update-user.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ProductsComponent,
    NewProductComponent,
    UpdateProductComponent,
    HomeComponent,
    InventoryComponent,
    CarritoComponent,
    BarComponent,
    FooterComponent,
    BranchOfficesComponent,
    ReportsComponent,
    UsuariosComponent,
    NewBranchComponent,
    UpdateBranchComponent,
    AddProductInvComponent,
    UpdateProductInvComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
