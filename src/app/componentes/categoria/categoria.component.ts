import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Categoria } from '../../model/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
//sweetalert
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [NavbarComponent,NgFor,FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  categorias: Categoria[]=[];
  isUpdate:boolean = false;
  formCategoria:FormGroup = new FormGroup({});

  constructor(
    private categoriaService:CategoriaService
  ){}

  ngOnInit():void{
    this.listarCategorias();
    this.formCategoria = new FormGroup({
      idCategoria: new FormControl(''),
      nombre:new FormControl(''),
      estado:new FormControl(''),
    });
  }

  listarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (data: Categoria[]) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }

CrearCategoria() {
  this.isUpdate=false;
  this.categoriaService.crearCategoria(this.formCategoria.value).subscribe({
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
          title: 'Categoría creada'
        });
        this.listarCategorias();
        this.formCategoria.reset();
      }
    },
    error: (err) => {
      console.error('Error creando la categoría', err);
    }
  });
}

resetFormCategoria(){
  this.formCategoria.reset();
}

selectCategoria(categoria: any){
  this.isUpdate=true;
  this.formCategoria.controls['idCategoria'].setValue(categoria.idCategoria);
  this.formCategoria.controls['nombre'].setValue(categoria.nombre);
  this.formCategoria.controls['estado'].setValue(categoria.estado);
}

actualizarCategoria() {
  this.categoriaService.actualizarCategoria(this.formCategoria.value).subscribe(resp=>{
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
        title: 'Categoría actualizada'
      });
      this.listarCategorias();
      this.formCategoria.reset();
  }});
}

eliminarCategoria(idCategoria: any){
  Swal.fire({
    title: "¿Estás seguro de borrar esta categoria?",
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
      this.categoriaService.deleteCategoria(idCategoria).subscribe(resp=>{this.listarCategorias();});
    }
  });

}
}
