import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

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
  // Datos para graficar la tabla
  employeesTable = new MatTableDataSource([]);
  displayedColumns: string[] = ["Nombre (cargo)", "Edad", 
                                "Fecha contratación", "Acciones"];
  // Objeto de config. de snack bar
  snackBarConfig = new MatSnackBarConfig()
  // Para gestionar el sorting de la tabla
  @ViewChild(MatSort) sort: MatSort;

  constructor(private empService: EmployeesService,
              private router: Router,
              private snackBar: MatSnackBar) {
    // El snack bar tiene una duración de 4 seg. o hasta que el usuario lo cierre
    this.snackBarConfig.duration = 4000;
  }

  ngOnInit(): void {
    this.loadEmployeesData();
  }

  ngOnDestroy(): void {
    this.empSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
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
    this.empService.deleteEmployee(id).then(rs => {
      this.snackBar.open('Empleado borrado con éxito',
                           "Ok!", this.snackBarConfig);
    }).catch(err => {
      this.snackBar.open('Ha ocurrido un error con el borrado del empleado',
                           "Ok!", this.snackBarConfig);
        console.log(err);
    });
  }

  // Función que filtra los datos por medio del valor ingresado por el usuario
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeesTable.filter = filterValue.trim().toLowerCase();
  }

}
