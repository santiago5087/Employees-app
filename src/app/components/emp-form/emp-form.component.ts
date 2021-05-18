import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import * as moment from 'moment';

import { fullAgeValidator } from '../../shared/custom.validators';
import { CountriesService } from '../../services/countries.service';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.scss']
})
export class EmpFormComponent implements OnInit {

  employeeForm: FormGroup;
  title: string;
  countries: string[] = [];
  positionsTech = ['Programador', 'Diseñador'];
  positionsAdm = ['Fundador y CEO', 'Recursos humanos'];
  editEmp: Boolean;
  viewEmp: Boolean;
  createEmp: Boolean;
  idEmp: string;
  // Objeto de config. de snack bar
  snackBarConfig = new MatSnackBarConfig()

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private location: Location,
              private countriesServcie: CountriesService,
              private empService: EmployeesService,
              private snackBar: MatSnackBar) {
    this.countriesServcie.getAllCountries().subscribe(countries => {
      this.countries = countries;
    });
    // El snack bar tiene una duración de 4 seg. o hasta que el usuario lo cierre
    this.snackBarConfig.duration = 4000;
  }

  resetPosition(): void {
    if(this.editEmp || this.createEmp) {
      this.employeeForm.get('position').patchValue(null);
      this.employeeForm.get('commission').patchValue(0);
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.configureForm();
  }

  createForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      birthDay: ['', [Validators.required, fullAgeValidator]],
      country: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      hiringDate: ['', Validators.required],
      state: [true, Validators.required],
      area: ['', Validators.required],
      position: ['', Validators.required],
      commission: [0, [Validators.min(0), Validators.max(100)]]
    });
  }

  /*
  Este método configura el formulario dependiendo de si es para crear,
  editar o ver un empleado (esto se hace debido a que el formulario es 
  casi el mismo, por ende se aprovecha esto y se usa el mismo).
  */
  configureForm(): void {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    
    if(params['id']) {
      this.idEmp = params['id'];
      this.empService.getEmployee(this.idEmp).subscribe(empData => {
        let emp: Employee = empData.data() as Employee;
        delete emp.id;
        
        // Establece los valores del formalurio con los del empleado
        this.employeeForm.setValue({
          ...emp,
          birthDay: new Date(moment(emp.birthDay, 'DD/MM/YYYY').format('MM/DD/YYYY')),
          hiringDate: new Date(moment(emp.hiringDate, 'DD/MM/YYYY').format('MM/DD/YYYY'))
        });

        if(params['edit'] === 'false') {
          this.title = "Ver: " + emp.name;
          this.viewEmp = true;
          Object.keys(this.employeeForm.controls).forEach(key => {
            this.employeeForm.get(key).disable();
          });
        }
        else if(params['edit'] === 'true') {
          this.title = "Editando: " + emp.name;
          this.editEmp = true;
        }
      });
    } else {
      this.title = 'Nuevo empleado';
      this.createEmp = true;
    } 
  }

  sendEmployeeForm(): void {
    let birthDayCorrected = moment(this.employeeForm.get('birthDay').value).format('DD/MM/YYYY');
    let hiringDateCorrected = moment(this.employeeForm.get('hiringDate').value).format('DD/MM/YYYY');
    let newEmp: Employee = {
      ...this.employeeForm.value, 
      birthDay: birthDayCorrected,
      hiringDate: hiringDateCorrected
    }

    if(this.editEmp) {
      newEmp['id'] = this.idEmp;
      this.empService.updateEmployee(newEmp).then(rs => {
        this.snackBar.open('Empleado actualizado con éxito',
                           "Ok!", this.snackBarConfig);
      }).catch(err => {
        this.snackBar.open('Ha ocurrido un error con la edición del empleado',
                           "Ok!", this.snackBarConfig);
        console.log(err)
      });
    } else if(this.createEmp) {
      this.empService.createEmployee(newEmp).then(result => {
        this.snackBar.open('Empleado creado con éxito',
                           "Ok!", this.snackBarConfig);
      }).catch(err => {
        this.snackBar.open('Ha ocurrido un error con la creación del empleado',
                           "Ok!", this.snackBarConfig);
        console.log(err);
      });
    }
  }

  back(): void {
    this.location.back();
  }

}
