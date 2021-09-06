import { ThemeService } from '../../services/theme.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Bloqueo } from '../../../shared/models/block.interface';

@Component({
  selector: 'app-detailsStudentBlock',
  templateUrl: './detailsStudentBlock.component.html'
})
export class DetailsStudentBlockComponent implements OnInit {

  student: Bloqueo = null;

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
      this.router.navigate(['listStudentBlock']);
    }
  }

  onGoBackToList(): void {
    this.router.navigate(['listStudentBlock']);
  }
}