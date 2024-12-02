import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../model/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl="http://localhost:8080/api/v1/libros"
  constructor(private http:HttpClient) { }

  getLibros():Observable<Libro[]>{
    return this.http.get<Libro[]>(`${this.apiUrl}`);
  }

  crearLibro(libro: Libro):Observable<Libro>{
    return this.http.post<Libro>(this.apiUrl,libro);
  }

  getLibroById(idLibro:number):Observable<Libro>{
    return this.http.get<Libro>(`${this.apiUrl}/${idLibro}`);
  }

  actualizarLibro(libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${libro.idLibro}`, libro);
  }
  

  deleteAutor(idLibro: number){
    return this.http.delete(`${this.apiUrl}/${idLibro}`);
  }
}
