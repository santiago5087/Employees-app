import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpComponent } from './components/emp/emp.component';
import { EmpFormComponent } from './components/emp-form/emp-form.component';

const routes: Routes = [
  { path: 'home', component: EmpComponent },
  { path: 'employees', component: EmpFormComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
