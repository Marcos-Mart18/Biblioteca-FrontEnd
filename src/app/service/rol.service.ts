import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../model/rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl="http://localhost:8080/api/v1/roles"
  constructor(private http:HttpClient) { }


  getRoles():Observable<Rol[]>{
    return this.http.get<Rol[]>(`${this.apiUrl}`);
  }

  crearRol(rol: Rol):Observable<Rol>{
    return this.http.post<Rol>(this.apiUrl,rol);
  }

  getRolById(idRol:number):Observable<Rol>{
    return this.http.get<Rol>(`${this.apiUrl}/${idRol}`);
  }

  actualizarRol(rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.apiUrl}/${rol.idRol}`, rol);
  }
  

  deleteRol(idRol: number){
    return this.http.delete(`${this.apiUrl}/${idRol}`);
  } 
}
