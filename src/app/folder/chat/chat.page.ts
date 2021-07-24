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
      user: { name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
      message: { snippet: 'See you later', created: '09:00 AM' }
    },
    {
      user: { name: 'Dave', avatar: 'https://ui-avatars.com/api/?name=Dave' },
      message: { snippet: 'Im comming', created: '13:40 PM' }
    },
    {
      user: { name: 'Foo', avatar: 'https://ui-avatars.com/api/?name=Foo' },
      message: { snippet: 'Here is raining', created: '14:00 PM' }
    },
    {
      user: { name: 'Bar', avatar: 'https://ui-avatars.com/api/?name=Bar' },
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
