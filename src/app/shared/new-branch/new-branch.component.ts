import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-branch',
  templateUrl: './new-branch.component.html',
  styleUrls: ['./new-branch.component.css']
})
export class NewBranchComponent {
  SucursalForm = this.fb.group({
    nombre: ['', Validators.required],
    location: ['', Validators.required],
    CP: ['', Validators.required],
    RFC: ['', Validators.required],
    tel: ['', Validators.required],
    admin:['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    console.log(this.SucursalForm.value);
  }
}
