// reports.component.ts
import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../core/sales/sales.service';
import { ISales } from 'src/app/core/sales/sales';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [DecimalPipe]
})
export class ReportsComponent implements OnInit {
  salesData: ISales[] = [];
  p: number = 1;
  itemsPerPage: number = 10;
  branchOfficeId: string="";
  rol: string | null = null;

  constructor(private salesService: SalesService, private decimalPipe: DecimalPipe) {}

  async ngOnInit() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}'); // Obtener userProfile del local storage
    this.branchOfficeId = userProfile.branch_id;
    this.rol = userProfile.rol;
    if(this.rol == "soporte"){
      this.salesData = await this.salesService.findAll();
    }else if(this.rol == "admin"){
      this.salesData = await this.salesService.findByBranchOffice(this.branchOfficeId);
    }
    this.formatTotal();
  }

  getNumberOfPages(){
    return Math.ceil(this.salesData.length / this.itemsPerPage);
  }

  formatTotal() {
    this.salesData.forEach(sale => {
      if (typeof sale.total === 'object' && sale.total !== null) {
        const totalObject = sale.total as { $numberDecimal: string };
        if (totalObject.$numberDecimal) {
          sale.total = parseFloat(totalObject.$numberDecimal).toFixed(2); // Convierte a número
        }
      }
    });
  }

  formatDate(date: string) {
    const d = new Date(date);
    return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
  }

  getTotalSales() {
    let total = 0;
    this.salesData.forEach(sale => {
      total += parseFloat(sale.total);
    });
    return total.toFixed(2);
  }
}
