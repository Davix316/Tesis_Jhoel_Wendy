import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


// Components Routing
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileModule { }
