import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BranchOfficesService } from '../../core/branch_offices/branch-offices.service';
import { CreateBranchOfficeDto } from 'src/app/core/branch_offices/createBranch_offices.dto';
import { Router } from '@angular/router';

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
          this.router.navigate(['/sucursales']);
        })
        .catch((error) => {
          console.error('Error al crear la sucursal:', error);
        });
    }
  }
}
