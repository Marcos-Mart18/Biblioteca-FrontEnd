import { Routes } from '@angular/router';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { AutorComponent } from './componentes/autor/autor.component';
import { SeccionComponent } from './componentes/seccion/seccion.component';
import { EditorialComponent } from './componentes/editorial/editorial.component';
import { EmpleadoComponent } from './componentes/empleado/empleado.component';
import { AccesoComponent } from './componentes/acceso/acceso.component';
import { RolComponent } from './componentes/rol/rol.component';
import { AccesoRolComponent } from './componentes/acceso-rol/acceso-rol.component';
import { LibroComponent } from './componentes/libro/libro.component';

export const routes: Routes = [
    {
        path:'',
        component:NavbarComponent,
        title:''
    },
    {
        path:'categoria-biblio',
        component:CategoriaComponent,
        title:'Pagina categoria'
    },
    {
        path:'autor-biblio',
        component:AutorComponent,
        title:'Pagina autor'
    }, 
    {
        path:'seccion-biblio',
        component:SeccionComponent,
        title:'Pagina seccion'
    }, 
    {
        path:'editorial-biblio',
        component:EditorialComponent,
        title:'Pagina editorial'
    }, 
    {
        path:'editorial-biblio',
        component:EditorialComponent,
        title:'Pagina editorial'
    }, 
    {
        path:'empleado-biblio',
        component:EmpleadoComponent,
        title:'Pagina empleado'
    }, 
    {
        path:'acceso-biblio',
        component:AccesoComponent,
        title:'Pagina acceso'
    }, 
    {
        path:'rol-biblio',
        component:RolComponent,
        title:'Pagina rol'
    }, 
    {
        path:'acceso_rol-biblio',
        component:AccesoRolComponent,
        title:'Pagina acceso-rol'
    },
    {
        path:'libro-biblio',
        component:LibroComponent,
        title:'Pagina Libro'
    }, 
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    } 
];
