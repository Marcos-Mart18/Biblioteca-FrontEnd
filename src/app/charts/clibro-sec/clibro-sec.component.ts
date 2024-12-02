import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Libro } from '../../model/libro';
import { LibroService } from '../../service/libro.service';
import { AuthService } from '../../auth.service';

Chart.register(...registerables);

@Component({
  selector: 'app-clibroSec',
  standalone: true,
  imports: [],
  templateUrl: './clibroSec.component.html',
  styleUrls: ['./clibroSec.component.css']
})
export class ClibroSecComponent {
  librosSeccionChart: any; // Cambiado el nombre del gráfico
  libros: Libro[] = [];

  constructor(
    private libroService: LibroService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listarLibros();
  }

  listarLibros(): void {
    this.libroService.getLibros().subscribe(
      (data: Libro[]) => {
        this.libros = data;

        // Procesar datos para el gráfico (por Sección)
        const secciones = this.libros.map((libro) => libro.seccion.seccion);
        const uniqueSecciones = [...new Set(secciones)]; // Secciones únicas
        const librosPorSeccion = uniqueSecciones.map((seccion) =>
          this.libros.filter((libro) => libro.seccion.seccion === seccion).length
        );

        // Renderizar gráfico
        this.renderChart(uniqueSecciones, librosPorSeccion);
      },
      (error) => {
        console.error('Error al obtener los libros', error);
      }
    );
  }

  renderChart(labels: string[], data: number[]): void {
    const ctx = document.getElementById('librosSeccionChart') as HTMLCanvasElement;

    // Destruir el gráfico si ya existe
    if (this.librosSeccionChart) {
      this.librosSeccionChart.destroy();
    }

    // Generar colores dinámicos para cada barra
    // const backgroundColors = labels.map(() =>
    //   `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
    // );

    this.librosSeccionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, // Nombres de las secciones
        datasets: [
          {
            label: 'Cantidad de Libros',
            data: data, // Número de libros por sección
            // backgroundColor: backgroundColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
