import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
    {
      user: { name: 'Dave', avatar: 'https://ui-avatars.com/api/?name=Dave' },
      message: { snippet: 'Im comming', created: '13:40 PM' }
    },
    {
      user: { name: 'Luis', avatar: 'https://cdn.pixabay.com/photo/2020/02/14/12/09/school-4848352_960_720.jpg' },
      message: { snippet: 'Here is raining', created: '14:00 PM' }
    },
    {
      user: { name: 'Karla', avatar:
      'https://image.freepik.com/vector-gratis/ilustracion-dibujos-animados-lindo-astronauta-super-volador_138676-3259.jpg' },
      message: { snippet: 'idk', created: '14:00 PM' }
    }
  ];


  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  public showConversationPage()
  {
    this.navCtrl.navigateForward('/menu/conversacion');
  }

}
