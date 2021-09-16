import { ThemeService } from '../../services/theme.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Bloqueo } from '../../../shared/models/block.interface';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-detailsStudentBlock',
  templateUrl: './detailsStudentBlock.component.html'
})
export class DetailsStudentBlockComponent implements OnInit {

  student: Bloqueo = null;
  fechaInicio: any;
  fechaFin: any;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router, private adminsSvc: ThemeService) {
    const navigation = this.router.getCurrentNavigation();
    this.student = navigation?.extras?.state?.value;  
    this.fechaInicio = this.student.fechaI;

    console.log("FECHA I: ",this.fechaInicio.seconds);
    console.log("DIAS: ",this.student.dias);

    const d = this.student.dias;
    const fechaF = this.fechaInicio.seconds+(86400*d);
    console.log("FECHA F: ",fechaF);
    var t = new Date(1970, 0, 1); 
    t.setSeconds(fechaF);
    console.log(t);
    this.fechaFin = t;
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

