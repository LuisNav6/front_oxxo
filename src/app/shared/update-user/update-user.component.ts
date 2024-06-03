import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchOfficesService } from 'src/app/core/branch_offices/branch-offices.service';
import { IBranch_Office } from 'src/app/core/branch_offices/branch_offices';
import { UpdateUserDto } from 'src/app/core/users/updateUser.dto';
import { UsersService } from 'src/app/core/users/users.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{
  branches? : IBranch_Office[];
  usuario = this.router.getCurrentNavigation()?.extras.state?.["user"];
  
    UsuarioForm = this.fb.group({
      nombre: [this.usuario.name, Validators.required],
      apellido: [this.usuario.last_name, Validators.required],
      email: [this.usuario.email, Validators.required],
      tel: [this.usuario.tel, Validators.required],
      rol: [this.usuario.rol, Validators.required],
      branch: [this.usuario.branch_id, Validators.required]
    });

    ngOnInit(): void {
      this.loadBranches();
    }
    async loadBranches(){
      this.branches = await this.branchOffice.findAll();
      console.log(this.branches);
    }
  
    constructor(private fb: FormBuilder, private router: Router, private userService: UsersService, private branchOffice: BranchOfficesService) {}
  
    async onSubmit(): Promise<void> {
      if (this.UsuarioForm.valid) {
        const updateuserDto: UpdateUserDto = {
          name: this.UsuarioForm.get('nombre')?.value,
          last_name: this.UsuarioForm.get('apellido')?.value,
          email: this.UsuarioForm.get('email')?.value,
          tel: this.UsuarioForm.get('tel')?.value,
          rol: this.UsuarioForm.get('rol')?.value,
          branch_id: this.UsuarioForm.get('branch')?.value
        };
  
        try {
          console.log(updateuserDto);
          const updatedUser = await this.userService.update(this.usuario._id, updateuserDto);
          console.log('Sucursal actualizado:', updatedUser);
          this.router.navigate(['/usuarios']);
        } catch (error) {
          console.error('Error al actualizar la sucursal:', error);
        }
      }
    }
}
