import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareasService } from 'src/app/services/tareas.service';
import { PublicacionInterface } from 'src/app/shared/publicacion';
import { TareasInterface } from 'src/app/shared/tareas-interface';

@Component({
  selector: 'app-detalle-materia',
  templateUrl: './detalle-materia.page.html',
  styleUrls: ['./detalle-materia.page.scss'],
})
export class DetalleMateriaPage implements OnInit {
  segment: string;

  tareas: TareasInterface = null;
  listaTareas: PublicacionInterface[];
  materiaId: string;


  constructor(private tarService: TareasService, private router: Router){

    const navigation = this.router.getCurrentNavigation();
    this.tareas = navigation?.extras?.state?.value;
    this.materiaId = this.tareas.id;
    console.log('tareas id:', this.materiaId);

    this.getTareas(this.materiaId);

  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  ngOnInit() {

    this.segment = 'first';
    ///MOSTRAR TAREAS BY MATERIA
    if (typeof this.tareas === 'undefined') {
      this.router.navigate(['materias']);
    }


  }


  getTareas(idMat: string){
    this.tarService.getCollection<PublicacionInterface>('Publicaciones').subscribe(res => {
      this.listaTareas = res.filter(e => idMat === e.idMateria);
      console.log(this.listaTareas);
    });
  }


}
