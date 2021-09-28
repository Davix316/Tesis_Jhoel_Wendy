import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ComentariosInterface } from 'src/app/shared/comentarios';

@Component({
  selector: 'app-edit-comentario',
  templateUrl: './edit-comentario.page.html',
  styleUrls: ['./edit-comentario.page.scss'],
})
export class EditComentarioPage implements OnInit {

  @Input() ObjComentario:any;  
  @Input() ObjUComen:any;

 fecha=new Date();
  public formEditComentario=new FormGroup({
    texto:new FormControl('',[Validators.required]),
  });
  
  constructor(
    private modalController: ModalController,
    private fireStore:FirestoreService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
   
      this.formEditComentario.patchValue({
        texto:this.ObjComentario.texto,
    });
    
  }
 //CERRAR MODAL
 salirModal(){
  this.modalController.dismiss();
    }

//GUARDAR COMENTARIO ACTUALIZADO
  saveComentario(comentario:ComentariosInterface){
    if(this.formEditComentario.valid){
      console.log(comentario); 
  this.fireStore.updateDoc(comentario,'Comentarios',this.ObjComentario.id).then(res=>{
    this.salirModal();
  })
    }else{
      this.presentToast('No deje campos Vacios','danger');
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
