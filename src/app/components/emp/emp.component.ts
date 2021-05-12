import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.scss']
})
export class EmpComponent implements OnInit {

  constructor(//private empService: EmpleadosService,
              private fb: FormBuilder) { }

  // Formulario
  buscarEmpForm: FormGroup;

  // Datos para graficar la tabla
  empleados = new MatTableDataSource<Employee>([]);
  displayedColumns: string[] = ["Nombre (cargo)", "Edad", "Fecha contratación", "Acciones"];

  ngOnInit(): void {
  }

}
