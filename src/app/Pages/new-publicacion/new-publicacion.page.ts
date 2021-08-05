import { Component, OnInit } from '@angular/core';
import { AngularFirestore, fromCollectionRef } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { FireauthService } from 'src/app/services/fireauth.service';
import { MateriasService } from 'src/app/services/materias.service';
import { MateriasInterface } from 'src/app/shared/materias-interface';
import { PublicacionInterface } from 'src/app/shared/publicacion';

@Component({
  selector: 'app-new-publicacion',
  templateUrl: './new-publicacion.page.html',
  styleUrls: ['./new-publicacion.page.scss'],
})
export class NewPublicacionPage implements OnInit {
  userInfo: any;
  idUser: string;
  listaMaterias: MateriasInterface[];
  carreraId: string;

  public newPublicacion=new FormGroup({
    materia:new FormControl(),
    categoria:new FormControl(),
    titulo:new FormControl(),
    descripcion:new FormControl(),
    file:new FormControl()
  });

  constructor(
    private materiasServ: MateriasService,
    private firestore: AngularFirestore,
    private serviceauth: FireauthService
  ) {
     //INFORMACION DE USUARIO ACTUAL
     this.serviceauth.stateAuth().subscribe(user => {
      if (user != null) {
        this.idUser = user.uid;
        console.log(this.idUser);
        this.getuser(this.idUser);
      }
    });
  }




  ngOnInit() {
  }
  ///OBTENER INFO  USUARIO DE LA BDD
  public getuser(uid: string) {
    const docRef = this.firestore.collection('Usuarios').doc(uid);
    docRef.get().toPromise().then((doc) => {
      if (doc.exists) {
        //console.log('infoUser', doc.data());
        this.userInfo = doc.data();
        this.carreraId = this.userInfo.carrera;
        console.log(this.carreraId);
        //LISTAR MATERIAS DEL USUARIO
        this.obtenerMaterias(this.carreraId);
      } else {
        // doc.data() will be undefined in this case
        console.log('"no existe el usuario"');
      }
    }).catch((error) => {
      console.log('erro', error);
    });

  }


  //OBTENER MATERIAS DEL Usuario
  obtenerMaterias(idC: string) {

    const path = 'Materias';
    this.materiasServ.getCollection<MateriasInterface>(path).subscribe(res => {

      this.listaMaterias = res.filter(e => idC === e.idCarrera);

      console.log(this.listaMaterias);

      this.listaMaterias.forEach(element => {
        this.carreraId = element.id;
        console.log(element.id);
      });


    });
  }

  //GUARDAR NUEVA PUBLICACION
  savePublicacion(publi: PublicacionInterface){
try {
console.log(this.newPublicacion.value);

} catch (error) {
console.log(error);

}

  }
}
