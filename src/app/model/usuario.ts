import { Persona } from "./persona";

export class Usuario {
    idUsuario: number;
    username: string;
    password: string;
    isActive:string;

    constructor(idUsuario: number, username: string, password: string, isActive:string) {
        this.idUsuario = idUsuario;
        this.username = username;
        this.password = password;
        this.isActive = isActive;
    }
}
