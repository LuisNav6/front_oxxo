import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../core/products/products.service';
import { CreateProductDto } from '../../core/products/createProduct.dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  productoForm = this.fb.group({
    nombre: ['', Validators.required],
    precio: ['', Validators.required],
    descripcion: ['', Validators.required],
    foto: ['', Validators.required]
  });

  // Variable para guardar el archivo
  photoFile: File | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {}

  // Método para manejar el cambio del input de archivo
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.photoFile = event.target.files[0];
    }
  }

  async onSubmit(): Promise<void> {
    if (this.productoForm.valid) {
      const formData = this.productoForm.getRawValue(); // Obtener el valor sin la validación del formulario

      // Verificar y convertir precio a número
      const price: number = Number(parseFloat(formData.precio || '0').toFixed(2));

      // Crear el objeto CreateProductDto
      const createProductDto: CreateProductDto = {
        name: formData.nombre || "",
        price: price,
        description: formData.descripcion || "",
        photo: this.photoFile as File
      };
      console.log(createProductDto);
      try {
        await this.productService.create(createProductDto);
        console.log('Producto creado exitosamente');
        Swal.fire({
          title: 'Producto creado exitosamente!',
          text: '',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
        this.router.navigate(['/products']);
      } catch (error) {
        Swal.fire({
          title: 'No se pudo crear el producto!',
          text: 'Revisa tu petición.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
        console.error('Error al crear el producto:', error);
      }
    } else {
      console.error('El formulario no es válido');
    }
  }
}

