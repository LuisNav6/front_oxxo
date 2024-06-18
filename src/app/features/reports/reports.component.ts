import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../core/sales/sales.service';
import { ISales } from 'src/app/core/sales/sales';
import { DecimalPipe } from '@angular/common';
import { PaginatorState } from 'primeng/paginator';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [DecimalPipe],
})
export class ReportsComponent implements OnInit {
  salesData: ISales[] = [];
  filteredSales: ISales[] = [];
  first: number = 0;
  rows: number = 10;
  branchOfficeId: string = '';
  rol: string | null = null;
  dataAdmin: any;
  optionsAdmin: any;
  dataSoporte: any;
  optionsSoporte: any;

  constructor(
    private salesService: SalesService,
    private decimalPipe: DecimalPipe
  ) {}

  async ngOnInit() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    this.branchOfficeId = userProfile.branch_id;
    this.rol = userProfile.rol;
    if (this.rol == 'soporte') {
      this.salesData = await this.salesService.findAll();
    } else if (this.rol == 'admin') {
      this.salesData = await this.salesService.findByBranchOffice(
        this.branchOfficeId
      );
    }
    this.formatTotal();
    this.filteredSales = this.salesData;
    this.setupChart();
  }

  formatTotal() {
    this.salesData.forEach((sale) => {
      if (typeof sale.total === 'object' && sale.total !== null) {
        const totalObject = sale.total as { $numberDecimal: string };
        if (totalObject.$numberDecimal) {
          sale.total = parseFloat(totalObject.$numberDecimal).toFixed(2);
        }
      }
    });
  }

  formatDate(date: string) {
    const d = new Date(date);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  }

  getTotalSales() {
    let total = 0;
    this.salesData.forEach((sale) => {
      total += parseFloat(sale.total);
    });
    return total.toFixed(2);
  }

  setupChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const dates = [
      ...new Set(this.salesData.map((sale) => this.formatDate(sale.sale_date))),
    ];
    const branchOffices = [
      ...new Set(this.salesData.map((sale) => sale.branch_office_id)),
    ];
    const datasets: any[] = [];

    branchOffices.forEach((branchOfficeId) => {
      const branchSales = this.salesData
        .filter((sale) => sale.branch_office_id === branchOfficeId)
        .reduce((acc, sale) => {
          const date = this.formatDate(sale.sale_date);
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += parseFloat(sale.total);
          return acc;
        }, {} as { [date: string]: number });

      const data = dates.map((date) => branchSales[date] || 0);
      datasets.push({
        label: `Sucursal ${branchOfficeId}`,
        data: data,
        fill: false,
        borderColor: this.getRandomColor(),
        tension: 0.4,
      });
    });

    if (this.rol === 'admin') {
      this.dataAdmin = {
        labels: dates,
        datasets: datasets,
      };

      this.optionsAdmin = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };
    } else if (this.rol === 'soporte') {
      // Primero, necesitamos obtener la suma total de ventas para cada branch_office_id
      const branchSalesTotals = branchOffices.map((branchOfficeId) => {
        // Filtramos las ventas por branch_office_id y calculamos la suma total de ventas
        const totalSales = this.salesData
          .filter((sale) => sale.branch_office_id === branchOfficeId)
          .reduce((acc, sale) => acc + parseFloat(sale.total), 0);

        return {
          branch_office_id: branchOfficeId,
          totalSales: totalSales,
        };
      });

      // Creamos los datasets para el gráfico de barras
      const datasets = [
        {
          label: 'Total de ventas por sucursal',
          data: branchSalesTotals.map((branch) => branch.totalSales),
          backgroundColor: branchSalesTotals.map(() => this.getRandomColor()),
        },
      ];

      // Configuramos las etiquetas de branch_office_id para el eje y
      const branchLabels = branchSalesTotals.map(
        (branch) => `Branch ${branch.branch_office_id}`
      );

      // Configuramos los datos y opciones del gráfico
      this.dataSoporte = {
        labels: branchLabels, // Usamos los branch_office_id como etiquetas en el eje y
        datasets: datasets,
      };

      this.optionsSoporte = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };
    }
  }

  getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const pastelSaturation = Math.floor(Math.random() * 30) + 70; // 70-100
    const pastelLightness = Math.floor(Math.random() * 20) + 70; // 70-90
    return `hsl(${hue}, ${pastelSaturation}%, ${pastelLightness}%)`;
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  paginatedSales() {
    return this.filteredSales.slice(this.first, this.first + this.rows);
  }
}
