import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

interface reportPubliInterface {
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
  selector: 'app-report-publish',
  templateUrl: './report-publish.page.html',
  styleUrls: ['./report-publish.page.scss'],
})
export class ReportPublishPage implements OnInit {

@Input() ObjPublicacion: any;
@Input() ObjUReport:any;

public formReport=new FormGroup({
  motivo: new FormControl('',[Validators.required]),
  descripcion:  new FormControl('',[Validators.required]),
})


  constructor(
    private modalController: ModalController,
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

saveReporte(report: reportPubliInterface){
  try {
    if(this.formReport.valid){
  
  report.id=this.firestore.getId();
  report.idPoC=this.ObjPublicacion.id;
  report.idUReport=this.ObjUReport.id;
  report.nameUReport=this.ObjUReport.nombre;
  report.contentReport=this.ObjPublicacion.titulo;
  report.idUserOwner=this.ObjPublicacion.idUser;
  report.nameUserOwner=this.ObjPublicacion.nameUser;
  report.tipo='publicacion';
  const idReporte=report.id;
      this.firestore.saveDoc('Reportes', report, idReporte);
      this.modalController.dismiss({
        motivo: this.formReport.value.motivo
      })
    }
    else{
      this.presentToast('No deje campos vacíos','danger');
    }
    
  } catch (error) {
    console.log(error);
    
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
