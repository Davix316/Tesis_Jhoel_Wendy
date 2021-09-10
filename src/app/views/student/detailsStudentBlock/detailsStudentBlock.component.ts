import { ThemeService } from '../../services/theme.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Bloqueo } from '../../../shared/models/block.interface';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-detailsStudentBlock',
  templateUrl: './detailsStudentBlock.component.html'
})
export class DetailsStudentBlockComponent implements OnInit {

  student: Bloqueo = null;
  fechaInicio: any;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router, private adminsSvc: ThemeService) {
    const navigation = this.router.getCurrentNavigation();
    this.student = navigation?.extras?.state?.value;  
    this.fechaInicio = this.student.fechaI;
    
  }

  ngOnInit(): void {
    if (typeof this.student === 'undefined') {
      this.router.navigate(['listStudentBlock']);
    }

    //const format = 'dd/MM/yyyy';
    //const myDate = '2019-06-29';
    //const locale = 'en-US';
    //const formattedDate = formatDate(this.fechaInicio, format, locale);
    //console.log("fecha ",formattedDate);
  }

  onGoBackToList(): void {
    this.router.navigate(['listStudentBlock']);
  }
}