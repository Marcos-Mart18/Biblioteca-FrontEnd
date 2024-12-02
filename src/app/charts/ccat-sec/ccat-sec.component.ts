import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SeccionService } from '../../service/seccion.service';
import { Seccion } from '../../model/seccion';

Chart.register(...registerables);

@Component({
  selector: 'app-ccat-sec',
  standalone: true,
  imports: [],
  templateUrl: './ccat-sec.component.html',
  styleUrls: ['./ccat-sec.component.css']
})
export class CcatSecComponent {
  seccionesCategoriaChart: any;
  secciones: Seccion[] = [];

  constructor(private seccionService: SeccionService) {}

  ngOnInit(): void {
    this.listarSecciones();
  }

  listarSecciones(): void {
    this.seccionService.getSecciones().subscribe(
      (data: Seccion[]) => {
        this.secciones = data;
  
        // Procesar datos para el gráfico (por Categoría)
        const categorias = this.secciones
          .map((seccion) => seccion.categoria?.nombre)
          .filter((nombre): nombre is string => nombre !== undefined); // Filtrar undefined
  
        const uniqueCategorias = [...new Set(categorias)]; // Categorías únicas
        const seccionesPorCategoria = uniqueCategorias.map((categoria) =>
          this.secciones.filter((seccion) => seccion.categoria?.nombre === categoria).length
        );
  
        // Renderizar gráfico
        this.renderChart(uniqueCategorias, seccionesPorCategoria);
      },
      (error) => {
        console.error('Error al obtener las secciones', error);
      }
    );
  }
  

  renderChart(labels: string[], data: number[]): void {
    const ctx = document.getElementById('seccionesCategoriaChart') as HTMLCanvasElement;

    // Destruir el gráfico si ya existe
    if (this.seccionesCategoriaChart) {
      this.seccionesCategoriaChart.destroy();
    }

    // Generar colores dinámicos para cada barra
    const backgroundColors = labels.map(() =>
      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
    );

    this.seccionesCategoriaChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, // Nombres de las categorías
        datasets: [
          {
            label: 'Cantidad de Secciones',
            data: data, // Número de secciones por categoría
            backgroundColor: backgroundColors,
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
