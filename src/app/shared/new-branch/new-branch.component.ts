import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BranchOfficesService } from '../../core/branch_offices/branch-offices.service';
import { CreateBranchOfficeDto } from 'src/app/core/branch_offices/createBranch_offices.dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-branch',
  templateUrl: './new-branch.component.html',
  styleUrls: ['./new-branch.component.css']
})
export class NewBranchComponent{
  sucursalForm = this.fb.group({
    nombre: ['', Validators.required],
    location: ['', Validators.required],
    CP: ['', Validators.required],
    RFC: ['', Validators.required],
    tel: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private branchOfficesService: BranchOfficesService, private router: Router) {}

  onSubmit(): void {
    if (this.sucursalForm.valid) {
      const formData = this.sucursalForm.getRawValue();
      const branch: CreateBranchOfficeDto = {
        name: formData.nombre || "",
        location: formData.location || "",
        CP: formData.CP || "",
        RFC: formData.RFC || "",
        tel: formData.tel || ""
        
      };
      this.branchOfficesService.create(branch)
        .then((response) => {
          console.log('Nueva sucursal creada:', response);
          Swal.fire({
            title: 'Sucursal creada exitosamente!',
            text: '',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          });
          this.router.navigate(['/sucursales']);
        })
        .catch((error) => {
          Swal.fire({
            title: 'No se pudo crear la sucursal!',
            text: 'Revisa tu petición.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
          console.error('Error al crear la sucursal:', error);
        });
    }
  }
}
