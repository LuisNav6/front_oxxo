import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchOfficesService } from 'src/app/core/branch_offices/branch-offices.service';
import { UpdateBranchOfficeDto } from 'src/app/core/branch_offices/updateBranch_offices.dto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-branch',
  templateUrl: './update-branch.component.html',
  styleUrls: ['./update-branch.component.css']
})
export class UpdateBranchComponent {
  sucursal = this.router.getCurrentNavigation()?.extras.state?.["branch"];
    SucursalForm = this.fb.group({
      nombre: [this.sucursal.name, Validators.required],
      location: [this.sucursal.location, Validators.required],
      CP: [this.sucursal.CP, Validators.required],
      RFC: [this.sucursal.RFC, Validators.required],
      tel: [this.sucursal.tel, Validators.required]
    });
  
    constructor(private fb: FormBuilder, private router: Router, private branchOfficesService: BranchOfficesService) {}

      async onSubmit(): Promise<void> {
        if (this.SucursalForm.valid) {
          const updateBranchDto: UpdateBranchOfficeDto = {
            name: this.SucursalForm.get('nombre')?.value,
            location: this.SucursalForm.get('location')?.value,
            CP: this.SucursalForm.get('CP')?.value,
            RFC: this.SucursalForm.get('RFC')?.value,
            tel: this.SucursalForm.get('tel')?.value,
          };
    
          try {
            console.log(updateBranchDto);
            const updatedBranch = await this.branchOfficesService.update(this.sucursal._id, updateBranchDto);
            console.log('Sucursal actualizado:', updatedBranch);
            Swal.fire({
              title: `La sucursal ${updateBranchDto.name}`,
              text: 'Fue actualizada exitosamente!',
              icon: 'success',
              confirmButtonText: 'Cerrar'
            });
            this.router.navigate(['/sucursales']);
          } catch (error) {
            Swal.fire({
              title: `La sucursal ${updateBranchDto.name} no fue actualizado!`,
              text: 'Revisa tu petición!',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
            console.error('Error al actualizar la sucursal:', error);
          }
        }
    }

}
