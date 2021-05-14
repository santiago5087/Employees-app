import { FormGroup, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

export function fullAgeValidator() {
  return (fg: FormGroup): ValidationErrors => {
    let result: ValidationErrors = null;
    const birthDay = moment(fg.get('birthDay').value);
    const dateNow = moment();
    let yearsDiff = dateNow.diff(birthDay, 'years');

    if(yearsDiff < 18) {
      result = { fullAgeError: 'Debes de tener mínimo 18 años' }; 
    }
  
    return result; 
  }
}
