import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonDetailService {

  constructor( private http: HttpClient ) { }

  getPersonDetail(id: number){
    return this.http.get(`https://abitus-api.pjc.mt.gov.br/v1/pessoas/${id}`);
  }
}
