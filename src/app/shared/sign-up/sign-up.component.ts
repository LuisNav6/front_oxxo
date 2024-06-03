import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchOfficesService } from 'src/app/core/branch_offices/branch-offices.service';
import { IBranch_Office } from 'src/app/core/branch_offices/branch_offices';
import { CreateUserDto } from 'src/app/core/users/createUser.dto';
import { UsersService } from 'src/app/core/users/users.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  registerForm!: FormGroup;
  branches? : IBranch_Office[];
  constructor(private fb: FormBuilder, private router: Router, private userService: UsersService, private branchService: BranchOfficesService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      rol: ['', Validators.required], 
      branch: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });;
    this.loadBranches();
  }

  async loadBranches(){
    this.branches = await this.branchService.findAll();
    console.log(this.branches);
  }

  onSubmit() {
    if (this.registerForm?.valid) {
      const formData = this.registerForm.getRawValue();
      const user: CreateUserDto = {
        name: formData.name || "",
        last_name: formData.lastname || "",
        email: formData.email || "",
        tel: formData.tel || "",
        rol: formData.rol || "",
        password: formData.password || "",
        branch_id: formData.branch || "",
        
      };
      this.userService.create(user)
        .then((response) => {
          console.log('Nuevo usuario creado:', response);
          this.router.navigate(['/usuarios']);
        })
        .catch((error) => {
          console.error('Error al crear al usuario:', error);
        });
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }

}
