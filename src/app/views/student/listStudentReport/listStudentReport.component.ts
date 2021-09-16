import { ThemeService } from '../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listStudentReport',
  templateUrl: './listStudentReport.component.html'
})
export class ListStudentReportComponent implements OnInit {
  Reportes$ = this.adminsSvc.reportes;

  idPubli: string;
  Publi: any;
  idPubliSelect='';


  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(
    private router: Router, 
    private adminsSvc: ThemeService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  onGoBackToList(): void {
    this.router.navigate(['listStudent']);
  }

  async onGoToDelete(reporteId: string): Promise<void> {
    const confirmacion = confirm('Esta seguro que desea eliminar el reporte');
    if (confirmacion) {
    try {
      await this.adminsSvc.onDeleteReport(reporteId);
      alert('Reporte Eliminado');
    } catch (err) {
      console.log(err);
    }
  }
}

onGoToSee(item: any): void {
  const p = item.idPoC;
  this.getPublicacion(p);
}

getPublicacion(item){
  this.firestore.collection('Publicaciones').ref.where('id', '==', item)

      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.Publi=doc.data();
            this.idPubliSelect=this.Publi.id;
            this.navigationExtras.state.value = this.Publi;
            this.router.navigate(['carreras/archivo'], this.navigationExtras);
           });
      })
      .catch((error) => {
          console.log('Error getting documents:' , error);
      });
  
}
}