import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Acceso } from '../../model/acceso';
import { Rol } from '../../model/rol';
import { AccesoService } from '../../service/acceso.service';
import { RolService } from '../../service/rol.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-acceso-rol',
  standalone: true,
  imports: [NavbarComponent,NgFor,HeaderComponent],
  templateUrl: './acceso-rol.component.html',
  styleUrl: './acceso-rol.component.css'
})
export class AccesoRolComponent {
  accesos: Acceso[]=[];
  roles: Rol[]=[];
  titulo='Gestión de Accesos Roles';
  icono='bi bi-boombox-fill';

  constructor(
    private rolService:RolService,
    private accessoService:AccesoService
  ){}

  ngOnInit():void{
    this.listarRoles();
    this.listarAccesos();
  }

  listarRoles(): void {
    this.rolService.getRoles().subscribe(
      (data: Rol[]) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al obtener los roles', error);
      }
    );
  }

  listarAccesos(): void {
    this.accessoService.getAccesos().subscribe(
      (data: Acceso[]) => {
        this.accesos = data;
      },
      (error) => {
        console.error('Error al obtener los accesos', error);
      }
    );
  }
}
