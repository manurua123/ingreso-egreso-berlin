import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresosEgresosComponent } from './components/ingresos-egresos/ingresos-egresos.component';

const routes: Routes = [
  {path: '' , component: IngresosEgresosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
