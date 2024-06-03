import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {
constructor(private router: Router){}

redirect(){
  this.router.navigate(['/login']);
}

}
