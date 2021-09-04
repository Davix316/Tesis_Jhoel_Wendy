import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.page.html',
  styleUrls: ['./conversacion.page.scss'],
})
export class ConversacionPage implements OnInit {
  public contactInfo: any = {
    name: 'Mecanica EM',
    status: 'ONLINE'
  };
  public showOptions = false;
  public messages: Array<any> = [
    { text: 'Hello', type: 'received', created: '14:02' },
    { text: 'Nothing', type: 'send', created: '14:05' },
    { text: 'could you explain the answer to me?', type: 'send', created: '14:05' },
    { text: 'Im sorry, ', type: 'received', created: '14:15' },
    { text: 'but can we go tomorrow?', type: 'received', created: '14:16' },
    { text: 'Nothing', type: 'send', created: '14:05' },
    { text: 'Nothing', type: 'send', created: '14:05' },
    { text: 'Nothing', type: 'send', created: '14:05' },
    { text: 'Nothing', type: 'send', created: '14:05' },
    { text: 'Im sorry, I can', type: 'received', created: '14:15' },
    { text: 'but can we go tomorrow?', type: 'received', created: '14:16' },
  ];

  constructor() { }

  ngOnInit() {
  }
  showOptionsToggle(value?: boolean) {
    if (value !== undefined) {
      this.showOptions = value;
      return;
    }
    this.showOptions = !this.showOptions;
  }

}
