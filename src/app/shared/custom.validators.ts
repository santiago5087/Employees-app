import { FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function fullAgeValidator(control: AbstractControl): ValidationErrors {
  let result: ValidationErrors = null;
  const birthDay = moment(control.value);
  const dateNow = moment();
  let yearsDiff = dateNow.diff(birthDay, 'years');

  if(yearsDiff < 18) {
    result = { fullAgeError: 'Debes de tener mínimo 18 años' }; 
  }

  return result; 
}
