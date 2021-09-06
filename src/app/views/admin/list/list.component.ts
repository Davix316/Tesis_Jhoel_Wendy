import { ThemeService } from '../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  Usuarios$ = this.adminsSvc.admins;
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
    this.router.navigate(['edit'], this.navigationExtras);
  }

  onGoToSee(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['details'], this.navigationExtras);
  }

  onGoToNew() {
    this.router.navigate(['newAdmin']);
  }

  async onGoToDelete(adminId: string): Promise<void> {
    const confirmacion = confirm('Esta seguro que desea eliminar al administrador');
    if (confirmacion) {
      try {
        await this.adminsSvc.onDeleteAdmins(adminId);
        alert('Administrador Eliminado');
      } catch (err) {
        console.log(err);
      }
    }
  }
}