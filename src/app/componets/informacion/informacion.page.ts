import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }
  

  async infoOption1() {
    const comentarPT="Comentar Publicaciones"
    const comentarPD="Ingresa en cada publicación  escribe un comentario, habilitas mostrar comentarios y observa el comentario publicado"
    
    const actionSheet = await this.actionSheetController.create({
      header: comentarPT,
      subHeader: comentarPD,
     mode:'ios',
      buttons: [
         {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async infoOption2() {
   
    const actionSheet = await this.actionSheetController.create({
      header: 'Calificar comentarios',
      subHeader: 'Votar o calificar el comentario de un compañero es importante, asi un estudiante va acumulando puntos.'+
      '   Se Requiere acumular 50 puntos para empezar a publicar tareas. Un estudiante solo podra votar una sola vez en cada comentario',
     mode:'ios',
      buttons: [
         {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async infoOption3() {
    
    const actionSheet = await this.actionSheetController.create({
      header: 'Calificar Publicaciones',
      subHeader: 'El usuario puede dar like o dislike en cada publicación , los likes no cuentan en la acumulación  de puntos del estudiante',
     mode:'ios',
      buttons: [
         {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async infoOption4() {
   
    const actionSheet = await this.actionSheetController.create({
      header: 'Visualizar materias',
      subHeader: 'El listado de materias se presenta según  la carrera registrada por el estudiante, estas a su vez se pueden filtrar por semestres',
     mode:'ios',
      buttons: [
         {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async infoOption5() {
    
    const actionSheet = await this.actionSheetController.create({
      header: 'Visualizar tareas, cuestionarios, proyectos, etc. dentro de cada materia',
      subHeader: 'El usuario puede ingresar dentro de cada materia y visualizar las publicaciones ordenadas por categorías según las indicadas anteriormente',
     mode:'ios',
      buttons: [
         {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async infoOption6() {
    
    const actionSheet = await this.actionSheetController.create({
      header: 'Descargar archivos',
      subHeader: 'Una tarea publicada debe incluir un archivo sea pdf, word o excel, estos archivos pueden ser descargados en el teléfono',
     mode:'ios',
      buttons: [
         {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async infoOption7() {
    
    const actionSheet = await this.actionSheetController.create({
      header:'Chatear entre compañeros de igual carrera',
      subHeader: 'Cada comentario publicado incluye la opción -chat- para establecer una comunicación con el propietario de las respuestas',
     mode:'ios',
      buttons: [
         {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async infoOption8() {
   
    const actionSheet = await this.actionSheetController.create({
      header: 'Agregar una publicación  a favoritos.',
      subHeader: 'Una publicación se le agrega a favoritos accediendo al detalle de la publicación y dando clic sobre el icono -heart- y se elimina dando nuevamente clic en el mismo icono o ingresando a favoritos desde el menú',
     mode:'ios',
      buttons: [
         {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async infoOption9() {
   
    const actionSheet = await this.actionSheetController.create({
      header: 'Reportar Comentarios o Publicaciones',
      subHeader: 'Un estudiante puede reportar un comentario ubicándose en él, dando clic en el icono (...) seleccionando la opción reportar y llenar el formulario del motivo del reporte.',
     mode:'ios',
      buttons: [
         {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async infoOption10() {
    
    const actionSheet = await this.actionSheetController.create({
      header: 'Subir mis propias tareas',
      subHeader: 'Se puede subir las tareas una vez el estudiante cumpla con la acumulación  de 50 votos en los comentarios realizados',
     mode:'ios',
      buttons: [
         {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async infoOption11() {
    
    const actionSheet = await this.actionSheetController.create({
      header: 'Ver mis puntos',
      subHeader: 'Puedes ver tus puntos acumulados desde el perfil personal en la opción mis puntos',
     mode:'ios',
      buttons: [
         {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



}
