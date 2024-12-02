import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Rol } from '../../model/rol';
import { RolService } from '../../service/rol.service';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [NavbarComponent,NgFor,FormsModule,NgIf,ReactiveFormsModule,HeaderComponent],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent {
  roles: Rol[]=[];
  isUpdate:boolean = false;
  formRol:FormGroup = new FormGroup({});
  titulo='Gestión de Roles';
  icono='bi bi-boombox-fill';

  constructor(
    private rolService:RolService
  ){}

  ngOnInit():void{
    this.listarRoles();
    this.formRol = new FormGroup({
      idRol: new FormControl(''),
      nombre: new FormControl(''),
      estado:new FormControl(''),
    });
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

CrearRoles() {
  this.isUpdate=false;
  this.rolService.crearRol(this.formRol.value).subscribe({
    next: (resp) => {
      if (resp) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#fff',  // Ajuste del fondo
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          customClass: {
            popup: 'custom-toast-popup'
          }
        });
        Toast.fire({
          icon: 'success',
          title: 'Rol creado'
        });
        this.listarRoles();
        this.formRol.reset();
      }
    },
    error: (err) => {
      console.error('Error creando el rol', err);
    }
  });
}

resetFormRol(){
  this.formRol.reset();
}

selectRol(rol: any){
  this.isUpdate=true;
  this.formRol.controls['idRol'].setValue(rol.idRol);
  this.formRol.controls['nombre'].setValue(rol.nombre);
  this.formRol.controls['estado'].setValue(rol.estado);
}

actualizarRol() {
  this.rolService.actualizarRol(this.formRol.value).subscribe(resp=>{
    if (resp) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#fff',  // Ajuste del fondo
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
        customClass: {
          popup: 'custom-toast-popup'
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Rol actualizado'
      });
      this.listarRoles();
      this.formRol.reset();
  }});
}

eliminarRol(idRol: any){
  Swal.fire({
    title: "¿Estás seguro de borrar este Rol?",
    text: "¡No serás capaz de reveritrlo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#19e212",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borralo!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "¡Borrado!",
        text: "El dato ha sido borrado",
        icon: "success"
      });
      this.rolService.deleteRol(idRol).subscribe(resp=>{this.listarRoles();});
    }
  });
}
}
