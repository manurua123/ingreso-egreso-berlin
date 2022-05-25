import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { Ingreso } from 'src/app/models/ingreso.model';
import { IngresosEgresosService } from 'src/app/services/ingresos-egresos.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'fecha',
    'ingreso',
    'nombre',
    'temperatura',
    'empresa',
    'fechaEgreso',
    'salida',
    'vehiculo',
    'patente',
    'observaciones',

  ];
  dataSource: MatTableDataSource<Ingreso>;
  ingresos?: Ingreso[];
  currentIngreso?: Ingreso;

  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ingresosSvc: IngresosEgresosService) {
    this.retrieveIngresos();
  }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  retrieveIngresos(): void {
    this.ingresosSvc
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);

      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  exportAsExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ingresos-'+moment(new Date).format('DD-MM-YYYY') +'.xlsx');
  }

  marcarSalida(elem: any){
    elem.fechaEgreso= moment(new Date()).format('DD/MM/YYYY');
    elem.egreso = moment(new Date()).tz('America/Argentina/Buenos_Aires').format("HH:mm")
    console.log('elemento actualizado',elem)
    this.ingresosSvc.update(elem)


  }
}
