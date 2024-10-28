import { Categoria } from "./categoria";

export interface Seccion {
    idSeccion:number;
    seccion:string;
    categoria: Categoria;
    estado:string;
}
