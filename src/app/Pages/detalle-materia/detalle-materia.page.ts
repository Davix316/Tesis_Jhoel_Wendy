/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TareasService } from 'src/app/services/tareas.service';
import { MateriasInterface } from 'src/app/shared/materias';
import { PublicacionInterface } from 'src/app/shared/publicacion';

@Component({
  selector: 'app-detalle-materia',
  templateUrl: './detalle-materia.page.html',
  styleUrls: ['./detalle-materia.page.scss'],
})
export class DetalleMateriaPage implements OnInit {
  segment: string;

  tareas: MateriasInterface = null;
  listaTareas: PublicacionInterface[];
  materiaId: string;
  materiaName: string;
  tareas0 = true;
cuestionarios0 =true;
proyectos0=true;


  //obtener id Clic=keado
navigationExtras: NavigationExtras = {
  state: {
    value: null
  }
};

  constructor(private tarService: TareasService, private router: Router) {

    const navigation = this.router.getCurrentNavigation();
    this.tareas = navigation?.extras?.state?.value;
      //Si no hay ID de tarea retorna
      if (typeof this.tareas==='undefined') {
        this.router.navigate(['/menu/materias']);
      }
      //
    this.materiaId = this.tareas.id;
    this.materiaName=this.tareas.nombre;
    console.log('Materia id:', this.materiaId);
//Busca Tareas por ID de la Carrera
      this.getTareas(this.materiaId);



  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  ngOnInit() {

    this.segment = 'first';



  }


  getTareas(idMat: string) {
    this.tarService.getCollection<PublicacionInterface>('Publicaciones').subscribe(res => {
      this.listaTareas = res.filter(e => idMat === e.idMateria);

      if (this.listaTareas.length === 0){
        this.tareas0= true;
        this.cuestionarios0 =true;
        this.proyectos0=true;
        console.log('"No hay tareas"');
      }
      else{
        this.tareas0=false;
        this.cuestionarios0 =false;
        this.proyectos0=false;
      }
      console.log(this.listaTareas);
    });
  }

  //INFORMACION DE LA TAREA CLICKEADA
  infoTarea(item: any): void{
    this.navigationExtras.state.value=item;
      this.router.navigate(['/menu/detalle-tarea'],this.navigationExtras);

  }



}
