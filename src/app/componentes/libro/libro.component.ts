import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Libro } from '../../model/libro';
import { Seccion } from '../../model/seccion';
import { Editorial } from '../../model/editorial';
import { LibroService } from '../../service/libro.service';
import { SeccionService } from '../../service/seccion.service';
import { EditorialService } from '../../service/editorial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [NavbarComponent,NgFor,FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
  libros: Libro[]=[];
  secciones: Seccion[]=[];
  editoriales: Editorial[]=[];
  isUpdate:boolean = false;
  formLibro:FormGroup = new FormGroup({});
  mostrarTabla: boolean = true;

  cambiaVista() {
    this.mostrarTabla = !this.mostrarTabla;
  }

  constructor(
    private libroService:LibroService,
    private seccionService:SeccionService,
    private editorialService:EditorialService
  ){}

  ngOnInit():void{
    this.listarLibros();
    this.listarEditoriales();
    this.listarSecciones();
    this.formLibro = new FormGroup({
      idLibro: new FormControl(''),
      titulo: new FormControl(''),
      paginas: new FormControl(''),
      edicion: new FormControl(''),
      portada: new FormControl(''),
      descripcion: new FormControl(''),
      idSeccion:new FormControl(''),
      idEditorial:new FormControl(''),
      estado:new FormControl(''),
    });
  }

  listarLibros(): void {
    this.libroService.getLibros().subscribe(
      (data: Libro[]) => {
        this.libros = data;
      },
      (error) => {
        console.error('Error al obtener los libros', error);
      }
    );
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

  crearLibro() {
    const nuevolibro = {
      idLibro: this.formLibro.value.idLibro,
      titulo: this.formLibro.value.titulo,
      paginas: this.formLibro.value.paginas,
      edicion: this.formLibro.value.edicion,
      portada: this.formLibro.value.portada,
      descripcion: this.formLibro.value.descripcion,
      seccion: { idSeccion: this.formLibro.value.idSeccion } as any, 
      editorial: { idEditorial: this.formLibro.value.idEditorial } as any, 
      estado: this.formLibro.value.estado
    } as any;
    this.libroService.crearLibro(nuevolibro).subscribe({
      next: (resp) => {
        if (resp) {
          Swal.fire({
            icon: 'success',
            title: 'Libro creado',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          this.listarLibros();
          this.formLibro.reset();
        }
      },
      error: (err) => {
        console.error('Error creando el libro', err);
      }
    });
  }

  resetFormLibro(){
    this.formLibro.reset();
  }

  selectLibro(libro: any) {
    this.isUpdate = true;
    this.formLibro.controls['idLibro'].setValue(libro.idLibro);
    this.formLibro.controls['titulo'].setValue(libro.titulo);
    this.formLibro.controls['paginas'].setValue(libro.paginas);
    this.formLibro.controls['edicion'].setValue(libro.edicion);
    this.formLibro.controls['portada'].setValue(libro.portada);
    this.formLibro.controls['descripcion'].setValue(libro.descripcion);
    this.formLibro.controls['idSeccion'].setValue(libro.seccion.idSeccion); 
    this.formLibro.controls['idEditorial'].setValue(libro.editorial.idEditorial); 
    this.formLibro.controls['estado'].setValue(libro.estado);
  }

  actualizarLibro() {
    const nuevolibro = {
      idLibro: this.formLibro.value.idLibro,
      titulo: this.formLibro.value.titulo,
      paginas: this.formLibro.value.paginas,
      edicion: this.formLibro.value.edicion,
      portada: this.formLibro.value.portada,
      descripcion: this.formLibro.value.descripcion,
      seccion: { idSeccion: this.formLibro.value.idSeccion } as any, 
      editorial: { idEditorial: this.formLibro.value.idEditorial } as any, 
      estado: this.formLibro.value.estado
    } as any;
    this.libroService.actualizarLibro(nuevolibro).subscribe({
      next: (resp) => {
        if (resp) {
          Swal.fire({
            icon: 'success',
            title: 'Libro actualizado',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          this.listarLibros();
          this.formLibro.reset();
        }
      },
      error: (err) => {
        console.error('Error creando el libro', err);
      }
    });
  }

  eliminarLibro(idLibro: any){
    Swal.fire({
      title: "¿Estás seguro de borrar este libro?",
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
        this.libroService.deleteAutor(idLibro).subscribe(resp=>{this.listarLibros();});
      }
    });
  }
}
