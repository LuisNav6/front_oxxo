import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  rol: string = "";
  usuario: string = "";

  constructor(private router: Router) {}

  async ngOnInit() {
    const userProfileString = localStorage.getItem("userProfile");
    if (userProfileString) {
      const userProfile = JSON.parse(userProfileString);
      if (userProfile.rol && userProfile.name) {
        this.rol = userProfile.rol;
        this.usuario = userProfile.name;
      }
    }
  }

  onSubmit() {
    localStorage.removeItem("userProfile");
    this.router.navigate(['/login']);
  }
}
