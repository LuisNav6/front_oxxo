import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../core/products/products.service';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/core/inventory/inventory.service';
import { IProduct } from 'src/app/core/products/products';
import { IInventory } from 'src/app/core/inventory/inventory';
import { UpdateInventoryDto, UpdateInventoryItemDto } from '../../core/inventory/updateInventory.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product-inv',
  templateUrl: './add-product-inv.component.html',
  styleUrls: ['./add-product-inv.component.css']
})
export class AddProductInvComponent implements OnInit {
  products: IProduct[] = [];
  branchOfficeId: string | null = null;
  inventory: IInventory | null = null;
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private productsService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      product_id: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]]
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

    const newInventoryItem: UpdateInventoryItemDto = {
      product_id,
      quantity
    };

    if (this.inventory && this.branchOfficeId) {
      const updateInventoryDto: UpdateInventoryDto = {
        branch_office_id: this.branchOfficeId,
        inventory: [...this.inventory.inventory, newInventoryItem]
      };
      try {
        await this.inventoryService.update(this.inventory._id, updateInventoryDto);
        console.log('Inventario actualizado con éxito');
        Swal.fire({
          title: 'Producto añadido exitosamente!',
          text: 'Ahora se encuentra en tu inventario.',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
        this.router.navigate(['/inventario']); 
      } catch (error) {
        Swal.fire({
          title: 'No se pudo añadir el producto!',
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
