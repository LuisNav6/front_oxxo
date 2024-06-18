import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../core/products/products.service';
import { UpdateProductDto } from 'src/app/core/products/updateProduct.dto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  producto = this.router.getCurrentNavigation()?.extras.state?.["producto"];
  
  productoForm = this.fb.group({
    nombre: [this.producto.name, Validators.required],
    precio: [this.producto.price, Validators.required],
    descripcion: [this.producto.description, Validators.required],
    foto: [null, Validators.required]
  });

  photoFile: File | null = null;

  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService) {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.photoFile = event.target.files[0];
    }
  }

  async onSubmit(): Promise<void> {
    if (this.productoForm.valid) {
      const updateProductDto: UpdateProductDto = {
        name: this.productoForm.get('nombre')?.value,
        price: Number(parseFloat(this.productoForm.get('precio')?.value).toFixed(2)),
        description: this.productoForm.get('descripcion')?.value,
        photo: this.photoFile as File
      };

      try {
        console.log(updateProductDto);
        const updatedProduct = await this.productService.update(this.producto._id, updateProductDto);
        console.log('Producto actualizado:', updatedProduct);
        Swal.fire({
          title: `El producto ${updateProductDto.name}`,
          text: 'Fue actualizado exitosamente!',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
        this.router.navigate(['/products']);
      } catch (error) {
        Swal.fire({
          title: 'El producto no pudo ser actualizado!',
          text: 'Revisa tu petición.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
        console.error('Error al actualizar el producto:', error);
      }
    }
  }
}
