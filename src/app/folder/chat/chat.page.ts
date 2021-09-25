import { Component, OnInit } from '@angular/core';
import { snapshotChanges } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { element } from 'protractor';
import { ChatService } from 'src/app/services/chat.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { chatInterface } from 'src/app/shared/chat';
import { UserInterface } from 'src/app/shared/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public chatList: Array<any> = [
    {
      user: { name: 'Mecanica', avatar: 'https://firebasestorage.googleapis.com/v0/b/tesis-3fc38.appspot.com/o/Perfil%2F039-man.png?alt=media&token=3d636291-4b9c-4a3f-82b4-48dbbd76d4d9' },
      message: { snippet: 'See you later', created: '09:00 AM' }
    },

  ];

  //obtener id Clic=keado
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  ///////////////

  roomSender: any;
  roomReciber: any;

  idUSender: string;
  userLog: string;
  chats: chatInterface[];
  chatsUser=[];
  usuarios: UserInterface[];
  public roomChat: Array<any> = [];
  encontradoRes: boolean;
  encontradoSen: boolean;
elemento:any; 

  constructor(
    private navCtrl: NavController,
    private serviceauth: FireauthService,
    private chatService: ChatService,
    private router: Router,
  ) {
    //INFORMACION DE USUARIO LOGUEADO
    this.serviceauth.stateAuth().subscribe(user => {
      if (user != null) {
        this.idUSender = user.uid;
        this.userLog = user.uid;
        console.log('user logueado', this.idUSender);

        ///OBTENER MENSAJES
        this.getChat(this.userLog);
      }
    });


   
  }

  ngOnInit() {
     
    //Llamado a la funcion:
    this.getUsers();
    this.elemento=document.getElementById('app-mensajes')
  }




  //LEER MENSAJES
  getChat(idUser: string) {
    this.chats = [];
    //PRIMERA CONSULTA
    
    this.chatService.listarChats().orderByChild('idUserSender').equalTo(idUser).on('child_added', (res) => {
      // console.log('real=>', res.val());   
      const resultado=res.val().idUserReciver
      console.log('reciver:', resultado);
      this.chats.push(resultado)
  

    })
    //SEGUNDA CONSULTA
    
    this.chatService.listarChats().orderByChild('idUserReciver').equalTo(idUser).on('child_added', (snap) => {
      // console.log('real=>', snap.val()); 
      const valor=snap.val().idUserSender; 
     console.log('sender:', valor);
     this.chats.push(valor)
  
    })

    console.log('chat', this.chats);
    
   

  }


  //LEER USUARIOS
  getUsers() {
    this.chatService.getUsers<UserInterface>('Usuarios').subscribe(res => {
       //FILTRO A UN SOLO ID
    for(var i = 0; i < this.chats.length; i++) { 
      const elemento = this.chats[i];         
      if (!this.chatsUser.includes(this.chats[i])) {
        this.chatsUser.push(elemento);
      }
    }
console.log('ids de usuarios:', this.chatsUser);    


      if (res) {
        this.usuarios = res;
        console.log('usuario=>', this.usuarios);

        
        this.chatsUser.forEach(chat => {
          res.forEach(user => {
            if (chat==user.id) {
              this.roomChat.push(user);
              console.log('chateo con:', user.nombre);             
            }
          });
         
        })

        for(let ch of this.roomChat){

        }


      } //fin del if res


    });
  }







  public showConversationPage() {
    this.navCtrl.navigateForward('/menu/conversacion');
  }

  //NAVIGATION EXTRAS
  infoUserChat(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['/menu/detalle-chat'], this.navigationExtras);
  }

}
