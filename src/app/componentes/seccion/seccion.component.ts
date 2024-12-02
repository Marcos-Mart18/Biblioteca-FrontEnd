import { Component } from '@angular/core';
import { Seccion } from '../../model/seccion';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeccionService } from '../../service/seccion.service';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { Categoria } from '../../model/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-seccion',
  standalone: true,
  imports: [NavbarComponent,NgFor,FormsModule,NgIf,ReactiveFormsModule,HeaderComponent],
  templateUrl: './seccion.component.html',
  styleUrl: './seccion.component.css'
})
export class SeccionComponent {
  categorias: Categoria[]=[];
  secciones: Seccion[]=[];
  isUpdate:boolean = false;
  formSeccion:FormGroup = new FormGroup({});
  titulo='Gestión de Secciones';
  icono='bi bi-boombox-fill';

  constructor(
    private seccionService:SeccionService,
    private categoriaService:CategoriaService,
    private authService: AuthService
  ){}
  
  get isAdmin(): boolean {
    return this.authService.hasRole('ROLE_ADMIN');
  }
  
  get isUser(): boolean {
    return this.authService.hasRole('ROLE_USER');
  }

  ngOnInit():void{
    this.listarSecciones();
    this.listarCategorias();
    this.formSeccion = new FormGroup({
      idSeccion: new FormControl(''),
      seccion:new FormControl(''),
      idCategoria:new FormControl(''),
      estado:new FormControl(''),
    });
  }

listarSecciones(): void {
    this.seccionService.getSecciones().subscribe(
      (data: Seccion[]) => {
        this.secciones = data;
      },
      (error) => {
        console.error('Error al obtener las secciones', error);
      }
    );
}

  listarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (data: Categoria[]) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al obtener las secciones', error);
      }
    );
}


CrearSeccion() {
  const nuevaSeccion = {
    idSeccion: this.formSeccion.value.idSeccion,
    seccion: this.formSeccion.value.seccion,
    categoria: { idCategoria: this.formSeccion.value.idCategoria },
    estado: this.formSeccion.value.estado
  };


  this.seccionService.crearSeccion(nuevaSeccion).subscribe({
    next: (resp) => {
      if (resp) {
        Swal.fire({
          icon: 'success',
          title: 'Sección creada',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        this.listarSecciones();
        this.formSeccion.reset();
      }
    },
    error: (err) => {
      console.error('Error creando la sección', err);
    }
  });
}

resetFormSeccion(){
  this.formSeccion.reset();
}

selectSeccion(seccion: any) {
  this.isUpdate = true;
  this.formSeccion.controls['idSeccion'].setValue(seccion.idSeccion);
  this.formSeccion.controls['seccion'].setValue(seccion.seccion);
  this.formSeccion.controls['idCategoria'].setValue(seccion.categoria.idCategoria); 
  this.formSeccion.controls['estado'].setValue(seccion.estado);
}

actualizarSeccion() {
  const nuevaSeccion = {
    idSeccion: this.formSeccion.value.idSeccion,
    seccion: this.formSeccion.value.seccion,
    categoria: { idCategoria: this.formSeccion.value.idCategoria },
    estado: this.formSeccion.value.estado
  };


  this.seccionService.actualizarSeccion(nuevaSeccion).subscribe({
    next: (resp) => {
      if (resp) {
        Swal.fire({
          icon: 'success',
          title: 'Sección actualizada',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        this.listarSecciones();
        this.formSeccion.reset();
      }
    },
    error: (err) => {
      console.error('Error creando la sección', err);
    }
  });
}

eliminarSeccion(idSeccion: any){
  Swal.fire({
    title: "¿Estás seguro de borrar esta seccion?",
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
      this.seccionService.deleteSeccion(idSeccion).subscribe(resp=>{this.listarSecciones();});
    }
  });
}
}
