import { Editorial } from "./editorial";
import { Seccion } from "./seccion";

export class Libro {
    idLibro:number;
    titulo:string;
    paginas:number;
    edicion:string;
    portada:string;
    descripcion:string;
    estado:string;
    editorial:Editorial;
    seccion:Seccion;

    constructor(idLibro: number, titulo: string, paginas: number, edicion: string, portada: string, descripcion: string, estado: string, editorial: Editorial, seccion: Seccion) {
        this.idLibro = idLibro;
        this.titulo = titulo;
        this.paginas = paginas;
        this.edicion = edicion;
        this.portada = portada;
        this.descripcion = descripcion;
        this.estado = estado;
        this.editorial = editorial;
        this.seccion = seccion;
    }
}
