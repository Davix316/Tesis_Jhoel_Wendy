import { ThemeService } from '../../services/theme.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../shared/models/admin.interface';

@Component({
  selector: 'app-detailsStudent',
  templateUrl: './detailsStudent.component.html'
})
export class DetailsStudentComponent implements OnInit {

  student: Admin = null;
  fotoUser='';

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

    this.fotoUser = this.student.foto;

  }

  onGoToEdit(): void {
    this.navigationExtras.state.value = this.student;
    this.router.navigate(['editStudent'], this.navigationExtras);
  }

  async onGoToDelete(): Promise<void> {

    const confirmacion = confirm('Esta seguro que desea eliminar el estudiante');

    if (confirmacion) {
    try {
      await this.adminsSvc.onDeleteStudents(this.student?.id);
      alert('Estudiante Eliminado');
      this.onGoBackToList();
    } catch (err) {
      console.log(err);
    }
  }
  }

  onGoBackToList(): void {
    this.router.navigate(['listStudent']);
  }


}