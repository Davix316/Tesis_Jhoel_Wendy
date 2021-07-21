import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../services/firebaseauth.service';


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit{
 
  name: string;

  constructor(private serviceAuth : FirebaseauthService,
    private router:Router) {
     }

     ngOnInit() {
      this.serviceAuth.getCurrentUser().subscribe(user => {
        this.name = user.email;
      })
    }
};
