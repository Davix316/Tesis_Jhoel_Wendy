import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';

import { CarrerasComponent } from './carreras.component';
import { CarrerasRoutingModule } from './carreras-routing.module';
import { RedesComponent } from './redes/redes.component';
import { SistemasComponent } from './sistemas/sistemas.component';
import { AmbientalComponent } from './ambiental/ambiental.component';
import { ElectromecanicaComponent } from './electromecanica/electromecanica.component';
import { MateriasComponent } from './materias/materias.component';
import { ArchivoComponent } from './materias/archivo.component';
import { NewArchivoComponent } from './materias/new-archivo.component';

@NgModule({
  imports: [
    CommonModule,
    CarrerasRoutingModule,
    ChartsModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    CarrerasComponent, 
    RedesComponent, 
    SistemasComponent,
    AmbientalComponent, 
    ElectromecanicaComponent, 
    MateriasComponent, 
    ArchivoComponent, 
    NewArchivoComponent 
  ]
})
export class CarrerasModule { }