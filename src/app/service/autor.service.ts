import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from '../model/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private apiUrl="http://localhost:8080/api/v1/autores"
  constructor(private http:HttpClient) { }

  getAutor():Observable<Autor[]>{
    return this.http.get<Autor[]>(`${this.apiUrl}`);
  }

  crearAutor(autor: Autor):Observable<Autor>{
    return this.http.post<Autor>(this.apiUrl,autor);
  }

  getAutorById(idAutor:number):Observable<Autor>{
    return this.http.get<Autor>(`${this.apiUrl}/${idAutor}`);
  }

  actualizarAutor(autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.apiUrl}/${autor.idAutor}`, autor);
  }
  

  deleteAutor(idAutor: number){
    return this.http.delete(`${this.apiUrl}/${idAutor}`);
  }
}
