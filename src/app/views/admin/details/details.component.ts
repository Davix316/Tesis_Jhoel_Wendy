import { ThemeService } from '../../services/theme.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../shared/models/admin.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {

  admin: Admin = null;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router, private adminsSvc: ThemeService) {
    const navigation = this.router.getCurrentNavigation();
    this.admin = navigation?.extras?.state?.value;
  }

  ngOnInit(): void {
    if (typeof this.admin === 'undefined') {
      this.router.navigate(['list']);
    }
  }

  onGoToEdit(): void {
    this.navigationExtras.state.value = this.admin;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  async onGoToDelete(): Promise<void> {
    try {
      await this.adminsSvc.onDeleteAdmins(this.admin?.id);
      alert('Deleted');
      this.onGoBackToList();
    } catch (err) {
      console.log(err);
    }
  }

  onGoBackToList(): void {
    this.router.navigate(['list']);
  }


}