import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DetalleTareaPage } from 'src/app/Pages/detalle-tarea/detalle-tarea.page';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

opcion=['Eliminar','Reportar' ]

@Input() idUserLog: string;
@Input() idPublishUser:string;

@Input() idComentUser:string;
@Input() idUserLogC:string;

  constructor(private popoverCtrl:PopoverController) { }
 

  
 
  ngOnInit() {
    console.log('estoy logueado desde DT con:', this.idUserLog);
    console.log(' el idUser de la Publi', this.idPublishUser);
    console.log('estoy logueado ede Coment oc::', this.idUserLogC);
    console.log( 'id de User comentario:', this.idComentUser);
    
  } 

  btnPop(valor:string){
  console.log('boton press:', valor);  
this.popoverCtrl.dismiss({
  item:valor
})
}

}
