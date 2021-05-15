import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'
import * as moment from 'moment';

import { Employee } from '../../models/Employee';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.scss']
})
export class EmpComponent implements OnInit, OnDestroy {

  empSubscription: Subscription;
  // Formulario del filtro
  buscarEmpForm: FormGroup;
  // Datos para graficar la tabla
  employeesTable = new MatTableDataSource([]);
  displayedColumns: string[] = ["Nombre (cargo)", "Edad", "Fecha contratación", "Acciones"];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private empService: EmployeesService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.loadEmployeesData();
  }

  ngOnDestroy(): void {
    this.empSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.employeesTable.sort = this.sort;
  }

  loadEmployeesData(): void {
    this.empSubscription = this.empService
      .getEmployees()
      .subscribe((emps: Employee[]) => {
      this.employeesTable.data = emps.map((emp: Employee) => {
        const birthDay = moment(emp.birthDay, 'DD/MM/YYYY');
        const dateNow = moment();
        const years = dateNow.diff(birthDay, 'years');

        return {
          "id": emp.id,
          "Nombre (cargo)": `${emp.name} ${emp.position}`,
          "cargo": emp.position,
          "Edad": years,
          "Fecha contratación": emp.hiringDate
        }
      });
    });
  }

  onSubmitCreate(): void {
    this.router.navigate(['employees']);
  }

  onSubmitView(id: string): void {
    this.router.navigate(['employees', { id, edit: false }]);
  }

  onSubmitUpdate(id: string): void {
    console.log(id)
    this.router.navigate(['employees', { id, edit: true }]);
  }

  onSubmitDelete(id: string): void {
    this.empService.deleteEmployee(id);
  }

}
