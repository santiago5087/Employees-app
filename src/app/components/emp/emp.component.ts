import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

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

  constructor(private empService: EmployeesService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadEmployeesData();
  }

  ngOnDestroy(): void {
    this.empSubscription.unsubscribe();
  }

  loadEmployeesData(): void {
    this.empSubscription = this.empService
      .getEmployees()
      .subscribe((emps: Employee[]) => {
      this.employeesTable.data = emps.map((emp: Employee) => {
        console.log(emp)
        let years = new Date(Date.now() - Date.parse(emp.birthDay)).getFullYear() - 1970;
        
        return {
          "username": emp.username,
          "nombre": emp.name,
          "cargo": emp.position,
          "edad": years,
          "fechaContratacion": emp.hiringDay
        }
      });
      console.log(this.employeesTable.data);
    });
  }

}
