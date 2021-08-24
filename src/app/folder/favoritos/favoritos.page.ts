import { Component, OnInit } from '@angular/core';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FavoritosInterface } from 'src/app/shared/favoritos';



@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  idUser: string;
  listaFavoritos: FavoritosInterface[];


  constructor(
    private serviceauth: FireauthService,
    private serviceFS: FirestoreService,

  ) { }

  ngOnInit() {
     //INFORMACION DE USUARIO ACTUAL
     this.serviceauth.stateAuth().subscribe(user => {
      if (user != null) {
        //id de Usuario de fireAuth
        this.idUser = user.uid;
        console.log(this.idUser);
        this.getFavoritos(this.idUser);
      }
    });
  }

  //LEER COLECCION FAVORITOS //Se requiere Id de Usuario
  getFavoritos(codUser: string){

this.serviceFS.readCollection<any>('Favoritos').subscribe(res=>{
  this.listaFavoritos = res.filter(e=>codUser===e.idUser);


});

  }
}
