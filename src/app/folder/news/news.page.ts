import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  cardItems: any[];
 public likes = 10;
  constructor() {
    this.cardItems = [
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        user_avtar: 'assets/img/marty-avatar.png',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        user_name: 'Marty McFly',
        date: 'November 5, 1955',
        image: 'assets/img/advance-card-bttf.png',
        // eslint-disable-next-line max-len
        content: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
      },
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        user_avtar: 'assets/img/sarah-avatar.png.jpeg',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        user_name: 'Sarah Connor',
        date: 'May 12, 1984',
        image: 'assets/img/advance-card-tmntr.jpg',
        // eslint-disable-next-line max-len
        content: 'I face the unknown future, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.'
      },
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        user_avtar: 'assets/img/ian-avatar.png',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        user_name: 'Dr. Ian Malcolm',
        date: 'June 28, 1990',
        image: 'assets/img/advance-card-jp.jpg',
        content: 'Your scientists were so preoccupied with whether or not they could, that they didn\'t stop to think if they should.'
      }
    ];
   }

  ngOnInit() {
  }

}
