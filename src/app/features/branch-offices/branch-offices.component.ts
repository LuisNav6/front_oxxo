import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchOfficesService } from '../../core/branch_offices/branch-offices.service';
import { IBranch_Office } from 'src/app/core/branch_offices/branch_offices';
import Swal from 'sweetalert2';
import { PaginatorState } from 'primeng/paginator';
@Component({
  selector: 'app-branch-offices',
  templateUrl: './branch-offices.component.html',
  styleUrls: ['./branch-offices.component.css']
})
export class BranchOfficesComponent implements OnInit{
  branches: IBranch_Office[] = [];
  first: number = 0;
  rows: number = 10;
  constructor(private router: Router, private branchOfficesService: BranchOfficesService) { }
  ngOnInit() {
    this.loadBranches();
  }

  async loadBranches(){
    this.branches = await this.branchOfficesService.findAll();
    console.log(this.branches);
  }
  crearSucursal() {
    this.router.navigate(['/new-branch']);
  }
  
  actualizarSucursal(branch: IBranch_Office) {
    this.router.navigate(['/update-branch'], { state: { branch } });
  }

  async deleteBranch(id:string){
    await this.branchOfficesService.delete(id);
    Swal.fire({
      title: 'Usuario eliminado exitosamente!',
      text: `"`,
      icon: 'success',
      confirmButtonText: 'Cerrar'
    });
    this.loadBranches();
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  paginatedBranches() {
    return this.branches.slice(this.first, this.first + this.rows);
  }
  

}
