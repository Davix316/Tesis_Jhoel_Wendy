import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { ChatService } from 'src/app/services/chat.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { chatInterface } from 'src/app/shared/chat';
import { UserInterface } from 'src/app/shared/user';


@Component({
  selector: 'app-detalle-chat',
  templateUrl: './detalle-chat.page.html',
  styleUrls: ['./detalle-chat.page.scss'],
})
export class DetalleChatPage implements OnInit {

  infUser: UserInterface=null;
  idUReceptor:string;
  nameUReceptor:string

  chat: chatInterface[];
  idUSender: string;
  userLog:string;

  public FormChat= new FormGroup({
    texto: new FormControl('', [Validators.required])
  });
  elemento: any;

  
  constructor(private router: Router,
    private serviceauth: FireauthService,
    private chatService: ChatService) { 
    ////////////
const navigation = this.router.getCurrentNavigation();
this.infUser = navigation?.extras?.state?.value;
console.log('user detalle:', this.infUser);
if (typeof this.infUser === 'undefined') {
  this.router.navigate(['/menu/chat']);
}
this.idUReceptor=this.infUser.id;
this.nameUReceptor=this.infUser.nombre;
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

    
    //OBTENER MENSAJES
    this.elemento = document.getElementById('app-mensajes');
    this.getMessages();
    

    
  }



  //LEER MENSAJES
  getMessages(){
    this.chatService.listarDatos().snapshotChanges().subscribe(data=>{
      //console.log('data:', data);
      //foco del mensaje
      setTimeout( ()=>{
        this.elemento.scrollTop = this.elemento.scrollHeight;
        },20);

      this.chat=[];
      data.forEach(item=>{
        let a = item.payload.toJSON(); 
        a['id'] = item.key;
        
        this.chat.push(a as chatInterface);
        
      })
      
    })
    

 
  }


  //GURDAR MENSAJES
  saveMessage(){

    var messagesRef=firebase.database().ref().child("Mensajes");
    if(this.FormChat.valid){ 
      var Mensaje={
        fecha: new Date().getTime(),
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
