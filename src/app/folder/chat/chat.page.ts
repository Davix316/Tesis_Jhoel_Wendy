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
      user: { name: 'John Doe', avatar: 'https://image.freepik.com/vector-gratis/granjero-que-usa-tecnologia-agricola_53876-120543.jpg' },
      message: { snippet: 'See you later', created: '09:00 AM' }
    },
    {
      user: { name: 'Dave', avatar: 'https://ui-avatars.com/api/?name=Dave' },
      message: { snippet: 'Im comming', created: '13:40 PM' }
    },
    {
      user: { name: 'Foo', avatar: 'https://cdn.pixabay.com/photo/2020/02/14/12/09/school-4848352_960_720.jpg' },
      message: { snippet: 'Here is raining', created: '14:00 PM' }
    },
    {
      user: { name: 'Bar', avatar:
      'https://image.freepik.com/vector-gratis/ilustracion-dibujos-animados-lindo-astronauta-super-volador_138676-3259.jpg' },
      message: { snippet: 'idk', created: '14:00 PM' }
    }
  ];


  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  public showConversationPage()
  {
    this.navCtrl.navigateForward('conversacion');
  }

}
