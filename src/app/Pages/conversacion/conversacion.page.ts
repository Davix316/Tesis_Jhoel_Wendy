import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  firebase from 'firebase';
import { Interface } from 'readline';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { chatInterface } from 'src/app/shared/chat';
import { ComentariosInterface } from 'src/app/shared/comentarios';
import { UserInterface } from 'src/app/shared/user';



@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.page.html',
  styleUrls: ['./conversacion.page.scss'],
})
export class ConversacionPage implements OnInit {
  public contactInfo: any = {
      status: 'En linea'
  };
  
  public showOptions: boolean = false;
   public messages: Array<any> = [
    { text: 'Hello', type: 'received', created: '14:02' },
    { text: 'Nothing', type: 'send', created: '14:05' },
    { text: 'could you explain the answer to me?', type: 'send', created: '14:05' },
   
  ]; 

  detalleComentario: ComentariosInterface = null;
  public mensajes:Observable<any[]>;
  idUSender: string;
  public FormChat= new FormGroup({
    texto: new FormControl('', [Validators.required])
  });
userLog:string;
  idUReceptor:string;
  nameUReceptor:string
chat: chatInterface[];
fechaM=new Date()
conversacion=[];

  constructor( private firestore: AngularFirestore,
    private serviceauth: FireauthService,
    private chatService: ChatService,
    private router: Router,
    ) { 
this.mensajes=firestore.collection('Mensajes').valueChanges();

////////////
const navigation = this.router.getCurrentNavigation();
this.detalleComentario = navigation?.extras?.state?.value;
console.log('conversaion detalle:', this.detalleComentario);
if (typeof this.detalleComentario === 'undefined') {
  this.router.navigate(['/menu/detalle-tarea']);
}
this.idUReceptor=this.detalleComentario.idUser;
this.nameUReceptor=this.detalleComentario.nameUser;
console.log(this.idUReceptor,'idUsuario receptor');


  }



  ngOnInit() {
     //INFORMACION DE USUARIO ACTUAL
     this.serviceauth.stateAuth().subscribe(user => {
      if (user != null) {
        this.idUSender = user.uid;
        this.userLog=user.uid;
        console.log('user logueado',this.idUSender);
        
        //console.log(this.codUser);
        //Busca en la coleccion Usuarios
        //this.getuser(this.codUser);
      }
    });

    ///OBTENER MENSAJES
    this.getMessages();
    this.chatService.listarDatos().snapshotChanges().subscribe(data=>{
      this.chat=[];
      data.forEach(item=>{
        let a = item.payload.toJSON(); 
        a['id'] = item.key;
        this.chat.push(a as chatInterface);
      })
    })
  }


  showOptionsToggle(value?: boolean) {
    if (value !== undefined) {
      this.showOptions = value;
      return;
    }
    this.showOptions = !this.showOptions;
  }


  //LEER MENSAJES
  getMessages(){

  this.chatService.listarDatos().valueChanges().subscribe(data=>{

  })
  }
  //GURDAR MENSAJES


  saveMessage(){

    var messagesRef=firebase.database().ref().child("Mensajes");
    if(this.FormChat.valid){ 
      console.log(this.FormChat.value);
     
     
      
      var Mensaje={
        fecha : new Date().getTime(),
        id:this.chatService.getId(),
        idUserReciver:this.idUReceptor,
        idUserSender:this.idUSender, 
        texto: this.FormChat.value.texto,
         
        
      }
      console.log(Mensaje.fecha);
      
      messagesRef.push(Mensaje)
      this.FormChat.reset();

    }

  }

 
  
  

}
