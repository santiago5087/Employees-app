import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  baseURL = 'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseURL}/all`)
                    .pipe(map(obj => {
                      return obj.map(c => c['name']);  
                    }));
  }

}
