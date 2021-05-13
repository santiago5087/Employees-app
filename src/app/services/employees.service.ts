import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private afDB: AngularFirestore) { }


  getEmployees(): Observable<Employee[]> {
    return this.afDB.collection<Employee>('employees')
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(empMetaData => {
          const emp = empMetaData.payload.doc.data();
          const id = empMetaData.payload.doc.id;

          return { id, ...emp }
        });
      }));
  }

  createEmployee(emp: Employee) {
    return this.afDB.collection('employees').add(emp);
  }

  updateEmployee(emp: Employee) {
    return this.afDB.collection('employees').doc(emp.id).update(emp);
  }

  deleteEmployee(id: string) {
    return this.afDB.collection('employees').doc(id).delete();
  }
  
}
