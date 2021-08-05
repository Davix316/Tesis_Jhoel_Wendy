import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { FirebaseauthService } from '../../views/services/firebaseauth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  name: string;

  constructor(private serviceAuth : FirebaseauthService, private afAuth: AngularFireAuth, private router:Router) {
     }

     ngOnInit() {
        this.name = "super.admin@epn.edu.ec";
    }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  async salir() {
    this.serviceAuth.logout();
    console.log("Cerro Sesión")
    this.router.navigate(['/login'])
  }
}
