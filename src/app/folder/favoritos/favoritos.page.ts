import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PublicacionInterface } from 'src/app/shared/publicacion';
import { publiFavoritoInterface } from 'src/app/shared/favoritos';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';



@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  idUser: string;
  listaFavoritos = [];

  publicacion: any;
  favoritos: boolean;
  //obtener id Clic=keado
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };


  constructor(
    private serviceauth: FireauthService,
    private serviceFS: FirestoreService,
    private router: Router,
    private fireService: FirestoreService,
    private previewAnyFile: PreviewAnyFile,
  ) { }

  ngOnInit() {
    //INFORMACION DE USUARIO ACTUAL
    this.serviceauth.stateAuth().subscribe(user => {
      if (user != null) {
        //id de Usuario de fireAuth
        this.idUser = user.uid;
        console.log('idUser de favortios:', this.idUser);
        this.getFavoritos(this.idUser);
      }
    });
  }


  //LEER COLECCION FAVORITOS //Se requiere Id de Usuario
  getFavoritos(codUser: string) {
    this.serviceFS.getFavorito(codUser).subscribe((ref: any) => {
      if (ref) {
        this.publicacion = ref.publicacion;       
        this.favoritos=true;
      }
      else{
        this.favoritos=false;
        console.log('no hay lista de favoritos');
        
      }

    })

  }


  //NAVIGATION EXTRAS
  infoTarea(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['/menu/detalle-tarea'], this.navigationExtras);
  }

  

  //ABRIR ARCHIVO
  openFile(urlFile: string) {
    this.previewAnyFile.preview(urlFile).then(() => {

    }, (error) => {
      alert(JSON.stringify(error));
    });
  }

  //ELIMINAR DE LA LISTA D FAVORITO
  deleteFavorito(objPubli:publiFavoritoInterface) {
    this.fireService.deleteFav('Favoritos', this.idUser,objPubli);
  }


}



