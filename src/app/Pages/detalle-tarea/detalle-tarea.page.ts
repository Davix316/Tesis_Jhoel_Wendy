import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { TareasService } from 'src/app/services/tareas.service';
import { PublicacionInterface } from 'src/app/shared/publicacion';
import { TareasInterface } from 'src/app/shared/tareas-interface';



@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
})
export class DetalleTareaPage implements OnInit {
  fileUrl: SafeResourceUrl;

  titulo: string;

   tareas: PublicacionInterface=null;


  tareaId: string;


  constructor(
    private domSanit: DomSanitizer,
    private router: Router,
     ) {

      const navigation = this.router.getCurrentNavigation();
      this.tareas = navigation?.extras?.state?.value;
      console.log('tareas cons:', this.tareas);
      //Si no hay ID de tarea retorna
      if (typeof this.tareas==='undefined') {
        this.router.navigate(['/menu/home']);
      }
      //
      this.tareaId = this.tareas.id;
      console.log('Tarea id:', this.tareaId);

  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  ngOnInit(): void{


    this.fileUrl= this.domSanit.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/watch?v=RjGPlLLqRYg&list=RDMM&index=27'
      );



  }

  addFavorite(){
  }

}
