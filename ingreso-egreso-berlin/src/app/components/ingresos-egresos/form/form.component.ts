import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Ingreso } from 'src/app/models/ingreso.model';
import { IngresosEgresosService } from 'src/app/services/ingresos-egresos.service';
import * as moment from 'moment';
import 'moment-timezone';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  panelOpenState = false;
  dialogRef: MatDialogRef <any> ;

  constructor(private ingresosSvc: IngresosEgresosService) {

  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  submitted = false;
  nuevoIngreso: Ingreso = new Ingreso();

  save(): void {

    if (this.myControl.valid) {
      this.nuevoIngreso.create=new Date()
      this.nuevoIngreso.date = moment(new Date()).format('DD/MM/YYYY');
      this.nuevoIngreso.ingreso = moment(new Date()).tz('America/Argentina/Buenos_Aires').format("HH:mm");
      console.log(this.nuevoIngreso);
      this.ingresosSvc.create(this.nuevoIngreso).then(() => {
        this.submitted = true;
      });
    }
  }



}
