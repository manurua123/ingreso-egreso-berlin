import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import {MatSnackBar} from '@angular/material/snack-bar';
import { Ingreso } from '../models/ingreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresosEgresosService {

  private dbPath = '/ingresos-egresos';

  IngresosRef: AngularFirestoreCollection<Ingreso>;

  constructor(private db: AngularFirestore, private _snackBar: MatSnackBar) {
    this.IngresosRef = db.collection(this.dbPath,ref=>ref.orderBy('create','desc'));
  }

   getAll(): AngularFirestoreCollection<Ingreso> {

return this.IngresosRef
  }

  create(tutorial: Ingreso): any {
    this.openSnackBar('Ingreso registrado')
    return this.IngresosRef.add({ ...tutorial });
  }

  openSnackBar(message: string) {
    let action = 'X';
    let config: MatSnackBar;
    this._snackBar.open(message, action,{duration: 3000,horizontalPosition:'center',verticalPosition:'top'});
  }

  update(ingreso:Ingreso): Promise<void> {
    this.openSnackBar('Egreso registrado')
    return this.IngresosRef.doc(ingreso.id).update(ingreso);
  }

  delete(id: string): Promise<void> {
    return this.IngresosRef.doc(id).delete();
  }
}


