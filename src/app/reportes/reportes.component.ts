import { Component } from '@angular/core';
import { ClibroEdiComponent } from '../charts/clibroEdi/clibroEdi.component';
import { ClibroSecComponent } from '../charts/clibro-sec/clibro-sec.component';
import { NavbarComponent } from '../componentes/navbar/navbar.component';
import { CcatSecComponent } from '../charts/ccat-sec/ccat-sec.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [NavbarComponent,ClibroEdiComponent,ClibroSecComponent,CcatSecComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {

}
