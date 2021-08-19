import { ThemeService } from '../../services/theme.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../shared/models/admin.interface';

@Component({
  selector: 'app-blockStudent',
  templateUrl: './blockStudent.component.html'
})
export class BlockStudentComponent implements OnInit {

  student: Admin = null;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router, private adminsSvc: ThemeService) {
    const navigation = this.router.getCurrentNavigation();
    this.student = navigation?.extras?.state?.value;
  }

  ngOnInit(): void {
    if (typeof this.student === 'undefined') {
      this.router.navigate(['listStudent']);
    }
  }

  onGoToEdit(): void {
    this.navigationExtras.state.value = this.student;
    this.router.navigate(['editStudent'], this.navigationExtras);
  }

  async onGoToDelete(): Promise<void> {
    try {
      await this.adminsSvc.onDeleteAdmins(this.student?.id);
      alert('Deleted');
      this.onGoBackToList();
    } catch (err) {
      console.log(err);
    }
  }

  onGoBackToList(): void {
    this.router.navigate(['listStudent']);
  }


}