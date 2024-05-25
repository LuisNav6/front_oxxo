import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  logout(): void {
    // Implementa la lógica de cierre de sesión aquí
    console.log('Logged out');
  }
}
