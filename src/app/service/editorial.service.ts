import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Editorial } from '../model/editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  private apiUrl="http://localhost:8080/api/v1/editoriales"
  constructor(private http:HttpClient) { }

  getEditoriales():Observable<Editorial[]>{
    return this.http.get<Editorial[]>(`${this.apiUrl}`);
  }

  crearEditoriales(editorial: Editorial):Observable<Editorial>{
    return this.http.post<Editorial>(this.apiUrl,editorial);
  }

  getEditorialById(idEditorial:number):Observable<Editorial>{
    return this.http.get<Editorial>(`${this.apiUrl}/${idEditorial}`);
  }

  actualizarEditorial(editorial: Editorial): Observable<Editorial> {
    return this.http.put<Editorial>(`${this.apiUrl}/${editorial.idEditorial}`, editorial);
  }
  

  deleteEditorial(idEditorial: number){
    return this.http.delete(`${this.apiUrl}/${idEditorial}`);
  }
}
