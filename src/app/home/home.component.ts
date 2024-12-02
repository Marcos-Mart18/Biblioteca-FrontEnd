import { Component } from '@angular/core';
import { NavbarComponent } from '../componentes/navbar/navbar.component';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,NgFor,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Bienvenidos a la Biblioteca';
  description = 'Explora nuestra colección de libros, autores, categorías, etc. Descubre un mundo de conocimiento.';
  services = [
    { icon: 'bi bi-book', name: 'Catálogo de Libros', description: 'Explora y busca libros de nuestra extensa colección.', link: '/libro-biblio' },
    { icon: 'bi bi-person-circle', name: 'Catálogo de Autores', description: 'Explora y busca autores de nuestra extensa colección.', link: '/autor-biblio' },
    { icon: 'bi bi-bookmark', name: 'Catálogo de Categorías', description: 'Explora y busca categorías de nuestra extensa colección.', link: '/categoria-biblio' }
  ];
}
