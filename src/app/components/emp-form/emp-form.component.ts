import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { fullAgeValidator } from '../../shared/helperFunctions';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.scss']
})
export class EmpFormComponent implements OnInit {

  employeeForm: FormGroup;
  title: string = 'Nuevo empleado';
  countries: string[] = ['Estados Unidos', 'Colombia'];
  positionsTech = ['Programador', 'Diseñador'];
  positionsAdm = ['Fundador y CEO', 'Recursos humanos'];

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    const params = this.activatedRoute.snapshot.params;
    console.log(params);

    if(params['id']) {
      if(params['edit']) {
        console.log('EDIT');
      } else {
        console.log('VIEW');
      }
    
    } else {
      console.log('CREATE');
      console.log(moment().calendar())
    }
  }

  createForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      birthDay: ['', Validators.required],
      country: ['', Validators.required],
      username: ['', Validators.required],
      hiringDate: ['', Validators.required],
      state: [true, Validators.required],
      area: ['Administrativa', Validators.required],
      position: ['', Validators.required],
      commission: [0, [Validators.min(0), Validators.max(1)]]
    });

    // this.employeeForm.setValidators(fullAgeValidator);
  }

  sendEmployeeForm() {
    console.log('Formulario empleado', this.employeeForm.value);
    let birthDay = moment(this.employeeForm.get('birthDay').value).format('DD/MM/YYYY');
    console.log('birthDay organizado', birthDay);
  }

}
