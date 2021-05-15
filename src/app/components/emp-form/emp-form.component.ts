import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import * as moment from 'moment';

import { fullAgeValidator } from '../../shared/custom.validators';
import { CountriesService } from '../../services/countries.service';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.scss']
})
export class EmpFormComponent implements OnInit {

  employeeForm: FormGroup;
  title: string = 'Nuevo empleado';
  countries: string[] = [];
  positionsTech = ['Programador', 'Diseñador'];
  positionsAdm = ['Fundador y CEO', 'Recursos humanos'];
  editEmp: Boolean = false;
  viewEmp: Boolean = true;
  idEmp: string;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private location: Location,
              private elementRef: ElementRef,
              private countriesServcie: CountriesService,
              private empService: EmployeesService) {
    this.countriesServcie.getAllCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  resetPosition(): void {
    this.employeeForm.get('position').patchValue(null);
    this.employeeForm.get('commission').patchValue(0);
  }

  ngOnInit(): void {
    this.createForm();
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
      });

      if(params['edit'] === 'false') {
        this.viewEmp = false;
        Object.keys(this.employeeForm.controls).forEach(key => {
          this.employeeForm.get(key).disable();
        });
      }

      else if(params['edit'] === 'true') {
        this.editEmp = true;
      }
    } 
  }

  createForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      birthDay: ['', [Validators.required, fullAgeValidator]],
      country: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      hiringDate: ['', Validators.required],
      state: [true, Validators.required],
      area: ['Administrativa', Validators.required],
      position: ['Recursos humanos', Validators.required],
      commission: [0, [Validators.min(0), Validators.max(100)]]
    });
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
      this.empService.updateEmployee(newEmp).then(result => {
        console.log('Actualizado!')
      }).catch(err => console.log(err));
    } else {
      this.empService.createEmployee(newEmp).then(result => {
        // Mostrar snackbar
        console.log('Creado!')
      }).catch(err => console.log(err));
    }
  }

  back(): void {
    this.location.back();
  }

}
