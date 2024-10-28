import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Empleado } from '../../model/empleado';
import { EmpleadoService } from '../../service/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [NavbarComponent,NgFor,FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {
  empleados: Empleado[]=[];
  isUpdate:boolean = false;
  formEmpleado:FormGroup = new FormGroup({});

  constructor(
    private empleadoService:EmpleadoService

  ){}

  ngOnInit():void{
    this.listarEmpleados();
    this.formEmpleado = new FormGroup({
      idEmpleado: new FormControl(''),
      nombres:new FormControl(''),
      apellidos:new FormControl(''),
      documento:new FormControl(''),
      telefono:new FormControl(''),
      correo:new FormControl(''),
      estado:new FormControl(''),
    });
  }

  listarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      (data: Empleado[]) => {
        this.empleados = data;
      },
      (error) => {
        console.error('Error al obtener los empleados', error);
      }
    );
  }

CrearEmpleado() {
  this.isUpdate=false;
  this.empleadoService.crearEmpleado(this.formEmpleado.value).subscribe({
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
          title: 'Empleado creada'
        });
        this.listarEmpleados();
        this.formEmpleado.reset();
      }
    },
    error: (err) => {
      console.error('Error creando el empleado', err);
    }
  });
}

resetFormEmpleado(){
  this.formEmpleado.reset();
}

selectEmpleadol(empleado: any){
  this.isUpdate=true;
  this.formEmpleado.controls['idEmpleado'].setValue(empleado.idEditorial);
  this.formEmpleado.controls['nombres'].setValue(empleado.nombres);
  this.formEmpleado.controls['apellidos'].setValue(empleado.apellidos);
  this.formEmpleado.controls['documento'].setValue(empleado.documento);
  this.formEmpleado.controls['telefono'].setValue(empleado.telefono);
  this.formEmpleado.controls['correo'].setValue(empleado.correo);
  this.formEmpleado.controls['estado'].setValue(empleado.estado);
}

actualizarEmpleado() {
  this.empleadoService.actualizarEmpleado(this.formEmpleado.value).subscribe(resp=>{
    if (resp) {
      this.listarEmpleados();
      this.formEmpleado.reset();
  }});
}

eliminarEmpleado(idEmpleado: any){
  Swal.fire({
    title: "¿Estás seguro de borrar este empleado?",
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
      this.empleadoService.deleteEmpleado(idEmpleado).subscribe(resp=>{this.listarEmpleados();});
    }
  });
}
}
