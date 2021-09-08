import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DetalleTareaPage } from 'src/app/Pages/detalle-tarea/detalle-tarea.page';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {


//Del componente detalle tarea
@Input() idUserLog: string;
@Input() idPublishUser:string;
//del componente Comentarios
@Input() OinfoComent:any;
@Input() idUserLogC:string;


  constructor(private popoverCtrl:PopoverController) { }
  
  ngOnInit() {
    console.log('objeto comentario:', this.OinfoComent);
    console.log('estoy logueado desde DT con:', this.idUserLog);
    console.log(' el idUser de la Publi', this.idPublishUser);
   
    console.log('estoy logueado desde Coment con:', this.idUserLogC);
    
  } 

  btnPop(valor:string){
  console.log('boton press:', valor);  
this.popoverCtrl.dismiss({
  item:valor
})
}

}
