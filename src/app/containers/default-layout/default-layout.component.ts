import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { FirebaseauthService } from '../../views/services/firebaseauth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  name: string;

  constructor(private serviceAuth : FirebaseauthService) {
     }

     ngOnInit() {
      this.serviceAuth.getCurrentUser().subscribe(user => {
        this.name = user.email;
      })
    }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
