import { ThemeService } from '../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-listStudent',
  templateUrl: './listStudent.component.html'
})
export class ListStudentComponent implements OnInit {
  Usuarios$ = this.adminsSvc.students;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router, private adminsSvc: ThemeService) { }

  ngOnInit(): void {
  }

  onGoToEdit(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['editStudent'], this.navigationExtras);
  }

  onGoToSee(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['detailsStudent'], this.navigationExtras);
  }

  onGoToNew(){
    this.router.navigate(['newStudent']);
  }

  onGoToBlock2(){
    this.router.navigate(['listStudentBlock']);
  }

  onGoToBlock(item: any): void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['blockStudent'], this.navigationExtras);  }

  async onGoToDelete(studentId: string): Promise<void> {
    try {
      await this.adminsSvc.onDeleteStudents(studentId);
      alert('Deleted');
    } catch (err) {
      console.log(err);
    }
  }
}