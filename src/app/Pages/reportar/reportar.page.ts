import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

interface reporteInterface {
id: string;
motivo:string;
descripReport:string;
idPoC:string;
idUserOwner:string;
nameUserOwner:string;
idUReport:string;
nameUReport:string;
contentReport:string;
tipo:string;
}

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.page.html',
  styleUrls: ['./reportar.page.scss'],
})
export class ReportarPage implements OnInit {

  @Input() ObjComentario: any;
  @Input()  userReport: any;
  

  public formReport=new FormGroup({
    motivo: new FormControl('',[Validators.required]),
    descripcion:  new FormControl('',[Validators.required]),
  })

  
  constructor(private modalController: ModalController,
    private firestore: FirestoreService,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    
    
  }


  //CERRAR MODAL
  salirModal(){
this.modalController.dismiss();
  }

//GUARDAR REPORTE

saveReporte(report: reporteInterface){
  if(this.formReport.valid){

report.id=this.firestore.getId();
report.idPoC=this.ObjComentario.id;
report.idUReport=this.userReport.id;
report.nameUReport=this.userReport.nombre;
report.contentReport=this.ObjComentario.texto;
report.idUserOwner=this.ObjComentario.idUser;
report.nameUserOwner=this.ObjComentario.nameUser;
report.tipo='comentario';
const idReporte=report.id;
    this.firestore.saveDoc('Reportes', report, idReporte);
    this.modalController.dismiss({
      motivo: this.formReport.value.motivo
    })
  }else{
    
    this.presentToast('No deje campos vacíos','danger');

  }
  

}

//PRESENTAR ALERTA 
async presentToast(text, color:string) {
  const toast = await this.toastController.create({
    message: text,
    duration: 2000,
    color: color
  });
  toast.present();
}

}
