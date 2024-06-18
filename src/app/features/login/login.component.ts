import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { UserPasswordLessDto } from 'src/app/core/auth/userPasswordLess.dto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm?.valid) {
      console.log(this.loginForm.value);
      this.login();
    }
  }

  async login() {
    if (this.loginForm.valid) {
      const credentials: UserPasswordLessDto = {
        email: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      try {
        const response = await this.authService.login(credentials);
        console.log('Login exitoso:', response);
        const profile = await this.authService.getProfile(response.access_token);
        localStorage.setItem('jwtToken', response.access_token);
        console.log('Perfil:', profile);
        localStorage.setItem('userProfile', JSON.stringify(profile));
        Swal.fire({
          title: `Bienvenido a SoftSale ${this.loginForm.value.username}!`,
          text: 'Es un placer tenerte con nosotros.',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      } catch (error) {
        console.error('Error en el login:', error);
        Swal.fire({
          title: `Usuario o contraseña incorrectos!`,
          text: 'Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    } else {
      console.error('Formulario inválido');
    }
    if(this.loginForm.value.username == "soporte@soporte.com")
    this.router.navigate(['/reportes']);
    else
    this.router.navigate(['/home']);
  }
}
