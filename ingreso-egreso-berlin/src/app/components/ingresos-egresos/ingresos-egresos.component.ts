import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-ingresos-egresos',
  templateUrl: './ingresos-egresos.component.html',
  styleUrls: ['./ingresos-egresos.component.css']
})
export class IngresosEgresosComponent {

  constructor(public dialog: MatDialog) {}


  openDialog() {
    const dialogRef = this.dialog.open(FormComponent,{
    width: '30%'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}



