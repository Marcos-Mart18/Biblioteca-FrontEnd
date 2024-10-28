import { Component } from '@angular/core';
import { Editorial } from '../../model/editorial';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { EditorialService } from '../../service/editorial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editorial',
  standalone: true,
  imports: [NavbarComponent,NgFor,FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './editorial.component.html',
  styleUrl: './editorial.component.css'
})
export class EditorialComponent {
  editoriales: Editorial[]=[];
  isUpdate:boolean = false;
  formEditorial:FormGroup = new FormGroup({});

  constructor(
    private editorialService:EditorialService
  ){}

  ngOnInit():void{
    this.listarEditoriales();
    this.formEditorial = new FormGroup({
      idEditorial: new FormControl(''),
      nombre:new FormControl(''),
      estado:new FormControl(''),
    });
  }

  listarEditoriales(): void {
    this.editorialService.getEditoriales().subscribe(
      (data: Editorial[]) => {
        this.editoriales = data;
      },
      (error) => {
        console.error('Error al obtener las editoriales', error);
      }
    );
  }

CrearEditorial() {
  this.isUpdate=false;
  this.editorialService.crearEditoriales(this.formEditorial.value).subscribe({
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
          title: 'Editorial creada'
        });
        this.listarEditoriales();
        this.formEditorial.reset();
      }
    },
    error: (err) => {
      console.error('Error creando la editorial', err);
    }
  });
}

resetFormEditorial(){
  this.formEditorial.reset();
}

selectEditorial(editorial: any){
  this.isUpdate=true;
  this.formEditorial.controls['idEditorial'].setValue(editorial.idEditorial);
  this.formEditorial.controls['nombre'].setValue(editorial.nombre);
  this.formEditorial.controls['estado'].setValue(editorial.estado);
}

actualizarEditorial() {
  this.editorialService.actualizarEditorial(this.formEditorial.value).subscribe(resp=>{
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
        title: 'Editorial actualizada'
      });
      this.listarEditoriales();
      this.formEditorial.reset();
  }});
}

eliminarEditorial(idEditorial: any){
  Swal.fire({
    title: "¿Estás seguro de borrar esta editorial?",
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
      this.editorialService.deleteEditorial(idEditorial).subscribe(resp=>{this.listarEditoriales();});
    }
  });
}
}
