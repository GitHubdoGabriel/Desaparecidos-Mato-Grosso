import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MissingPeopleService {

  constructor( private http: HttpClient ) {}

  getMissingPeople(page: number, perPage: number){
    let header = {
      page: page,
      perPage: perPage
    }
    return this.http.get(`https://abitus-api.pjc.mt.gov.br/v1/pessoas/aberto/filtro?porPagina=${perPage}&status=DESAPARECIDO&pagina=${header.page}`);      
  }
}
