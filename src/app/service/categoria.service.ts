import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl="http://localhost:8080/api/v1/categorias"
  constructor(private http:HttpClient) { }


  getCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.apiUrl}`);
  }

  crearCategoria(categoria: Categoria):Observable<Categoria>{
    return this.http.post<Categoria>(this.apiUrl,categoria);
  }

  getCategoriaById(idCategoria:number):Observable<Categoria>{
    return this.http.get<Categoria>(`${this.apiUrl}/${idCategoria}`);
  }

  actualizarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${categoria.idCategoria}`, categoria);
  }
  

  deleteCategoria(idCategoria: number){
    return this.http.delete(`${this.apiUrl}/${idCategoria}`);
  }
}
