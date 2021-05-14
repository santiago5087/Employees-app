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

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
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

}
