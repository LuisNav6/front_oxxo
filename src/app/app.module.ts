import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { ProductsComponent } from './features/products/products.component';
import { HomeComponent } from './features/home/home.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { CarritoComponent } from './features/carrito/carrito.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BarComponent } from './shared/bar/bar.component';
import { BranchOfficesComponent } from './features/branch-offices/branch-offices.component';
import { ReportsComponent } from './features/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ProductsComponent,
    HomeComponent,
    InventoryComponent,
    CarritoComponent,
    FooterComponent,
    BarComponent,
    BranchOfficesComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
