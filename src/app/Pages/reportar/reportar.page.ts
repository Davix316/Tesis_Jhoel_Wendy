import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

interface reporteInterface {
id: string;
idPoC:string;
idUser:string;
motivo:string;
nameUser:string;
}

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.page.html',
  styleUrls: ['./reportar.page.scss'],
})
export class ReportarPage implements OnInit {

  @Input() codComentario: string;
  @Input()  idUserLog: string;
  @Input()  nombreLog: string;

  public formReport=new FormGroup({
    motivo: new FormControl('',[Validators.required]),
  })

  
  constructor(private modalController: ModalController,
    private firestore: FirestoreService) { }

  ngOnInit() {
    console.log('codigo de comentario', this.codComentario);
    console.log('codigo de comentario', this.idUserLog);
    console.log('codigo de comentario', this.nombreLog);
    
  }


  //CERRAR MODAL
  salirModal(){
this.modalController.dismiss();
  }

//GUARDAR REPORTE

saveReporte(report: reporteInterface){
try {
  if(this.formReport.valid){

report.id=this.firestore.getId();
report.idPoC=this.codComentario;
report.idUser=this.idUserLog;
report.nameUser=this.nombreLog;
const idReporte=report.id;
    this.firestore.saveDoc('Reportes', report, idReporte);
    this.modalController.dismiss({
      motivo: this.formReport.value.motivo
    })
  }
  
} catch (error) {
  console.log(error);
  
}
}



}
