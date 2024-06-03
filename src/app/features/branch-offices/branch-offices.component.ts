import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchOfficesService } from '../../core/branch_offices/branch-offices.service';
import { IBranch_Office } from 'src/app/core/branch_offices/branch_offices';
@Component({
  selector: 'app-branch-offices',
  templateUrl: './branch-offices.component.html',
  styleUrls: ['./branch-offices.component.css']
})
export class BranchOfficesComponent implements OnInit{
  branches?: IBranch_Office[];
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
    location.reload();
  }
  

}
