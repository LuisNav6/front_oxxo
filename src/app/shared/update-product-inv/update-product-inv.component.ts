import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../core/products/products.service';
import {  Router } from '@angular/router';
import { InventoryService } from 'src/app/core/inventory/inventory.service';
import { IProduct } from 'src/app/core/products/products';
import { IInventory, IInventoryItem } from 'src/app/core/inventory/inventory';
import { UpdateInventoryDto, UpdateInventoryItemDto } from '../../core/inventory/updateInventory.dto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-product-inv',
  templateUrl: './update-product-inv.component.html',
  styleUrls: ['./update-product-inv.component.css']
})
export class UpdateProductInvComponent implements OnInit{
  products: IProduct[] = [];
  branchOfficeId: string | null = null;
  inventory: IInventory | null = null;
  productForm: FormGroup;
  id: string | null = null;
  quantities: number;
  newInventoryItem: UpdateInventoryItemDto = {};
  updateInventoryDto: UpdateInventoryDto = {};
  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private productsService: ProductService,
    private router: Router
  ) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as {id: string, quantities: any};
    
      this.id = state?.id;
      this.quantities = state?.quantities;
    
      this.productForm = this.fb.group({
        product_id: [this.id, Validators.required],
        quantity: [this.quantities, [Validators.required, Validators.min(1)]]
      });
  }

  ngOnInit(): void {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}'); // Obtener userProfile del local storage
    this.branchOfficeId = userProfile.branch_id;
    this.loadProducts();
    if (this.branchOfficeId) {
      this.loadInventory(this.branchOfficeId);
    } else {
      console.error('No branch_office_id found in local storage');
    }
  }

  async loadInventory(id: string) {
    this.inventory = await this.inventoryService.findByBranchId(id);
  }

  async loadProducts() {
    this.products = await this.productsService.findAll();
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.invalid) {
      return;
    }
    const { product_id, quantity } = this.productForm.value;
    console.log(this.productForm.value);
  
    if (this.inventory && this.branchOfficeId) {
      // Buscar si el producto ya existe en el inventario
      const existingProductIndex = this.inventory.inventory.findIndex(item => item.product_id === this.productForm.get('product_id')?.value);
      console.log(existingProductIndex);
      if (existingProductIndex!== -1) {
        // Si el producto existe, actualiza la cantidad;
        this.inventory.inventory[existingProductIndex].quantity = quantity;
      } else {
        // Si el producto no existe, añade un nuevo objeto al arreglo de inventario
        const newInventoryItem: IInventoryItem = {
          _id: '', // Initialize _id with an empty string, it will be generated by the server
          product_id,
          quantity
        };
        this.inventory.inventory.push(newInventoryItem);
      }
      this.updateInventoryDto = {
        branch_office_id: this.branchOfficeId,
        inventory: [...this.inventory.inventory]
      };
      try {
        console.log(this.updateInventoryDto);
        await this.inventoryService.update(this.inventory._id, this.updateInventoryDto);
        console.log('Inventario actualizado con éxito');
        Swal.fire({
          title: 'El producto fue actualizado en tu inventario!',
          text: '',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
        this.router.navigate(['/inventario']); 
      } catch (error) {
        Swal.fire({
          title: 'El producto no pudo ser actualizado!',
          text: 'Revisa tu petición.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
        console.error('Error actualizando el inventario:', error);
      }
    } else {
      console.error('Inventario no cargado o branchOfficeId no definido');
    }
  }
  
}
