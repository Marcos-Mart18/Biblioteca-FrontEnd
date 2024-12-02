import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Libro } from '../../model/libro';
import { LibroService } from '../../service/libro.service';
import { AuthService } from '../../auth.service';

Chart.register(...registerables);

@Component({
  selector: 'app-clibroEdi',
  standalone: true,
  imports: [],
  templateUrl: './clibroEdi.component.html',
  styleUrls: ['./clibroEdi.component.css']
})
export class ClibroEdiComponent {
  librosEditorialChart: any;
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

        const editoriales = this.libros.map((libro) => libro.editorial.nombre);
        const uniqueEditoriales = [...new Set(editoriales)]; // Editoriales únicas
        const librosPorEditorial = uniqueEditoriales.map((editorial) =>
          this.libros.filter((libro) => libro.editorial.nombre === editorial).length
        );

        this.renderChart(uniqueEditoriales, librosPorEditorial);
      },
      (error) => {
        console.error('Error al obtener los libros', error);
      }
    );
  }

  renderChart(labels: string[], data: number[]): void {
    const ctx = document.getElementById('librosEditorialChart') as HTMLCanvasElement;

    if (this.librosEditorialChart) {
      this.librosEditorialChart.destroy();
    }

    // const backgroundColors = labels.map(() =>
    //   `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
    // );

    // const borderColors = labels.map(() =>
    //   `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
    // );

    this.librosEditorialChart = new Chart(ctx, {
      type: 'bar', 
      data: {
        labels: labels, 
        datasets: [
          {
            label: 'Cantidad de Libros',
            data: data, 
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
