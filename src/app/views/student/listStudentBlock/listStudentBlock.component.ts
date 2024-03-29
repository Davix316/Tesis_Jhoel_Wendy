import { ThemeService } from '../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-listStudentBlock',
  templateUrl: './listStudentBlock.component.html'
})
export class ListStudentBlockComponent implements OnInit {
  Usuarios$ = this.adminsSvc.studentsBlock;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router, private adminsSvc: ThemeService) { }

  ngOnInit(): void {
  }

  onGoToSee(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['detailsStudentBlock'], this.navigationExtras);
  }

  onGoBackToList(): void {
    this.router.navigate(['listStudent']);
  }

  async onGoToDelete(studentId: string): Promise<void> {
    const confirmacion = confirm('Esta seguro que desea eliminar de bloqueados');
    if (confirmacion) {
    try {
      await this.adminsSvc.onDeleteStudentsBlock(studentId);
      alert('Eliminado de lista de bloqueados');
    } catch (err) {
      console.log(err);
    }
  }
}
}