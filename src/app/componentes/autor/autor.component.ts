import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Autor } from '../../model/autor';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutorService } from '../../service/autor.service';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-autor',
  standalone: true,
  imports: [NavbarComponent,NgFor,FormsModule,NgIf,ReactiveFormsModule,HeaderComponent],
  templateUrl: './autor.component.html',
  styleUrl: './autor.component.css'
})
export class AutorComponent {
  autores: Autor[]=[];
  isUpdate:boolean = false;
  formAutor:FormGroup = new FormGroup({});
  mostrarTabla: boolean = true;
  titulo='Gestión de Autores';
  icono='bi bi-boombox-fill';

  cambiaVista() {
    this.mostrarTabla = !this.mostrarTabla;
  }

  constructor(
    private autorService:AutorService,
    private authService: AuthService
  ){}

  get isAdmin(): boolean {
    return this.authService.hasRole('ROLE_ADMIN');
  }
  
  get isUser(): boolean {
    return this.authService.hasRole('ROLE_USER');
  }

  ngOnInit():void{
    this.listarAutores();
    this.formAutor = new FormGroup({
      idAutor: new FormControl(''),
      nombres:new FormControl(''),
      apellidos:new FormControl(''),
      pais:new FormControl(''),
      estado:new FormControl(''),
    });
  }


  listarAutores(): void {
    this.autorService.getAutor().subscribe(
      (data: Autor[]) => {
        this.autores = data;
      },
      (error) => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }

CrearAutor() {
  this.isUpdate=false;
  this.autorService.crearAutor(this.formAutor.value).subscribe({
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
          title: 'Autor creado'
        });
        this.listarAutores();
        this.formAutor.reset();
      }
    },
    error: (err) => {
      console.error('Error creando el autor', err);
    }
  });
}

resetFormAutor(){
  this.formAutor.reset();
}

selectAutor(autor: any){
  this.isUpdate=true;
  this.formAutor.controls['idAutor'].setValue(autor.idAutor);
  this.formAutor.controls['nombres'].setValue(autor.nombres);
  this.formAutor.controls['apellidos'].setValue(autor.apellidos);
  this.formAutor.controls['pais'].setValue(autor.pais);
  this.formAutor.controls['estado'].setValue(autor.estado);
}

actualizarAutor() {
  this.autorService.actualizarAutor(this.formAutor.value).subscribe(resp=>{
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
        title: 'Autor actualizado'
      });
      this.listarAutores();
      this.formAutor.reset();
  }});
}

eliminarAutor(idAutor: any){
  Swal.fire({
    title: "¿Estás seguro de borrar este Autor?",
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
      this.autorService.deleteAutor(idAutor).subscribe(resp=>{this.listarAutores();});
    }
  });

}
}
