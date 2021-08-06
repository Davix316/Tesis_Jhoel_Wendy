import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarrerasComponent } from './carreras.component';
import { SistemasComponent } from './sistemas/sistemas.component';
import { RedesComponent } from './redes/redes.component';
import { ElectromecanicaComponent } from './electromecanica/electromecanica.component';
import { AmbientalComponent } from './ambiental/ambiental.component';
import { MateriasComponent } from './materias/materias.component';
import { ArchivoComponent } from './materias/archivo.component';
import { InforArchivoComponent } from './materias/infor-archivo.component';


const routes: Routes = [
  {
    path: '',
    component: CarrerasComponent,
    data: {
      title: 'Carreras'
    },
  },
      {
        path: 'sistemas',
        component: SistemasComponent,
        data: {
          title: 'Desarrollo de Software'
        }
      },
      {
        path: 'redes',
        component: RedesComponent,
        data: {
          title: 'Redes y Telecomunicaciones'
        }
      },
      {
        path: 'electromecanica',
        component: ElectromecanicaComponent,
        data: {
          title: 'Electromecánica'
        }
      },
        {
          path: 'ambiental',
          component: AmbientalComponent,
          data: {
            title: 'Agua y Saneamiento'
        }
      },
      {
        path: 'materias',
        component: MateriasComponent,
        data: {
          title: 'Materias'
        }
      },
      {
        path: 'archivo',
        component: ArchivoComponent,
        data: {
          title: 'Archivo'
        }
      },
      {
        path: 'infor-archivo',
        component: InforArchivoComponent,
        data: {
          title: 'Información de archivo'
        }
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrerasRoutingModule {}
