import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CarrerasComponent } from './carreras.component';
import { CarrerasRoutingModule } from './carreras-routing.module';
import { RedesComponent } from './redes.component';
import { SistemasComponent } from './sistemas.component';
import { AmbientalComponent } from './ambiental.component';
import { ElectromecanicaComponent } from './electromecanica.component';
import { MateriasComponent } from './materias/materias.component';
import { ArchivoComponent } from './materias/archivo.component';
import { InforArchivoComponent } from './materias/infor-archivo.component';

@NgModule({
  imports: [
    CommonModule,
    CarrerasRoutingModule,
    ChartsModule,
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  declarations: [ 
    CarrerasComponent, 
    RedesComponent, 
    SistemasComponent,
    AmbientalComponent, 
    ElectromecanicaComponent, 
    MateriasComponent, 
    ArchivoComponent, 
    InforArchivoComponent 
  ]
})
export class CarrerasModule { }
