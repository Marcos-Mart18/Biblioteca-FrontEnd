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
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './compWeb/error/error.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { roleGuard } from './role.guard';
import { ReportesComponent } from './reportes/reportes.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent,
        title:'Login'
    },
    {
        path:'home-biblio',
        component:HomeComponent,
        title:'Pagina Inicio',
        canActivate: [AuthGuard]
    },
    {
        path:'navbar-biblio',
        component:NavbarComponent,
        title:'Pagina navbar',
        canActivate: [AuthGuard]
    },
    {
        path:'categoria-biblio',
        component:CategoriaComponent,
        title:'Pagina categoria',
        canActivate: [AuthGuard, roleGuard],
        data: { roles: ['ADMIN', 'USER'] }

    },
    {
        path:'autor-biblio',
        component:AutorComponent,
        title:'Pagina autor',
        canActivate: [AuthGuard, roleGuard],
        data: { roles: ['ADMIN', 'USER'] }
    }, 
    {
        path:'seccion-biblio',
        component:SeccionComponent,
        title:'Pagina seccion',
        canActivate: [AuthGuard, roleGuard],
        data: { roles: ['ADMIN', 'USER'] }
    }, 
    {
        path:'editorial-biblio',
        component:EditorialComponent,
        title:'Pagina editorial',
        canActivate: [AuthGuard, roleGuard],
        data: { roles: ['ADMIN', 'USER'] }
    }, 
    {
        path:'editorial-biblio',
        component:EditorialComponent,
        title:'Pagina editorial',
        canActivate: [AuthGuard, roleGuard],
        data: { roles: ['ADMIN', 'USER'] }
    }, 
    {
        path:'empleado-biblio',
        component:EmpleadoComponent,
        title:'Pagina empleado',
        canActivate: [AuthGuard,roleGuard],
        data: { roles: ['ADMIN'] }
    }, 
    {
        path:'acceso-biblio',
        component:AccesoComponent,
        title:'Pagina acceso',
        canActivate: [AuthGuard,roleGuard],
        data: { roles: ['ADMIN'] }
    }, 
    {
        path:'rol-biblio',
        component:RolComponent,
        title:'Pagina rol',
        canActivate: [AuthGuard,roleGuard],
        data: { roles: ['ADMIN'] }
    }, 
    {
        path:'acceso_rol-biblio',
        component:AccesoRolComponent,
        title:'Pagina acceso-rol',
        canActivate: [AuthGuard,roleGuard],
        data: { roles: ['ADMIN'] }
    },
    {
        path:'libro-biblio',
        component:LibroComponent,
        title:'Pagina Libro',
        canActivate: [AuthGuard, roleGuard],
        data: { roles: ['ADMIN', 'USER'] }
    },
    {
        path:'reportes-biblio',
        component:ReportesComponent,
        title:'Pagina Reportes',
        canActivate: [AuthGuard, roleGuard],
        data: { roles: ['ADMIN', 'USER'] }
    }, 
    {
        path: '**',
        pathMatch: 'full',
        component:ErrorComponent
    },
];
