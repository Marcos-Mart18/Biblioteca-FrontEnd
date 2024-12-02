import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Acceso } from '../../model/acceso';
import { AccesoService } from '../../service/acceso.service';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [NavbarComponent,NgFor,FormsModule,NgIf,ReactiveFormsModule,HeaderComponent],
  templateUrl: './acceso.component.html',
  styleUrl: './acceso.component.css'
})
export class AccesoComponent {
  accesos: Acceso[]=[];
  isUpdate:boolean = false;
  formAcceso:FormGroup = new FormGroup({});
  titulo='Gestión de Accesos';
  icono='bi bi-boombox-fill';

  constructor(
    private accessoService:AccesoService
  ){}

  ngOnInit():void{
    this.listarAccesos();
    this.formAcceso = new FormGroup({
      idAcceso: new FormControl(''),
      titulo:new FormControl(''),
      icono:new FormControl(''),
      url:new FormControl(''),
      estado:new FormControl(''),
    });
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

CrearAccesos() {
  this.isUpdate=false;
  this.accessoService.crearAcceso(this.formAcceso.value).subscribe({
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
          title: 'Acceso creada'
        });
        this.listarAccesos();
        this.formAcceso.reset();
      }
    },
    error: (err) => {
      console.error('Error creando el acceso', err);
    }
  });
}

resetFormAcceso(){
  this.formAcceso.reset();
}

selectAcceso(acceso: any){
  this.isUpdate=true;
  this.formAcceso.controls['idAcceso'].setValue(acceso.idAcceso);
  this.formAcceso.controls['titulo'].setValue(acceso.titulo);
  this.formAcceso.controls['icono'].setValue(acceso.icono);
  this.formAcceso.controls['url'].setValue(acceso.url);
  this.formAcceso.controls['estado'].setValue(acceso.estado);
}

actualizarAcceso() {
  this.accessoService.actualizarAcceso(this.formAcceso.value).subscribe({
    next: (resp) => {
      if (resp) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#fff', // Ajuste del fondo
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          customClass: {
            popup: 'custom-toast-popup',
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Acceso actualizado',
        });
        this.listarAccesos();
        this.formAcceso.reset();
      }
    },
    error: (err) => {
      console.error('Error actualizando el acceso', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el acceso',
      });
    },
  });
}


eliminarAcceso(idAcceso: any){
  Swal.fire({
    title: "¿Estás seguro de borrar este Acceso?",
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
      this.accessoService.deleteAcceso(idAcceso).subscribe(resp=>{this.listarAccesos();});
    }
  });
}
}
