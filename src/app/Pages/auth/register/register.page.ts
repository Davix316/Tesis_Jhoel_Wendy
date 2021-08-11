
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FireauthService } from 'src/app/services/fireauth.service';
import { User } from 'src/app/shared/userinterface';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';
import { MateriasService } from 'src/app/services/materias.service';

//INTERFAZ DE CARRERAS
interface Carreras {
  id?: string;
  nombre: string;
  numMaterias: number;
  numNiveles: number;
  }

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {
  //emailPattern: any = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  emailPattern: any =/^\w+([\.-]?\w+)*@epn.edu.ec+$/;



  listacarrera: Carreras[];


  public myFormUser=new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    apellido: new FormControl('',[Validators.required]),
    telefono: new FormControl('',[Validators.required]),
    numUnico: new FormControl('',[Validators.required]),
    carreraId: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    semestreRef: new FormControl('',[Validators.required]),
    foto: new FormControl('',[Validators.required]),
    carreraNombre:new FormControl(''),
  });


  constructor(
    public authService: FireauthService,
    public router: Router,
    private alertController: AlertController,
    private storage: AngularFireStorage,
    private materiasServ: MateriasService,
    ) { }


  ngOnInit() {
    this.getCarrera();
  }

    register(user: User){
      try{
        console.log(user);
        if(this.myFormUser.valid){
        //user.foto=this.inputImageUser.nativeElement.value;

        if(user.carreraId==='TkiP9dMmAXyoscir6GqF'){
          user.carreraNombre='TS- Electromecánica';
        }
        else if(user.carreraId==='i6e9eP0YTsnowV8p8EKi'){
          user.carreraNombre='TS- Redes y Telecomunicaciones';
        }
        else if(user.carreraId==='iw6XSHR2NiPPkwMSjKBM'){
          user.carreraNombre='TS- Agua y Saneamiento Ambiental';
        }
        else if(user.carreraId==='ph4kM1eyF6KoaieJqCr0'){
          user.carreraNombre='TS- Desarrollo de Software';
        }

        user.rol='estudiante';
        this.authService.registrar(user);
        }
        else{
          this.presentAlert();
        }
      }
      catch(error){
        console.error(error);
      }
  }

  /// LEER CARRERAS
getCarrera(){

this.materiasServ.getCollection<Carreras>('Carreras').subscribe(res=>{
if(res){
  this.listacarrera=res;
  console.log(res);
}
});
}

  //SUBIR IMAGEN
  /* upload(event) {
    // Get input file
    const file = event.target.files[0];
    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2);
    console.log(randomId);
    const filepath = `images/${randomId}`;
    const fileRef = this.storage.ref(filepath);
    // Upload image
    const task = this.storage.upload(filepath, file);
     // Get notified when the download URL is available
     task.snapshotChanges().pipe(
      finalize(() => this.uploadURL = fileRef.getDownloadURL())
    ).subscribe();
  } */

  //ALERT
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Llene los campos!',
      buttons: ['OK']
    });

    await alert.present();
  }

get emailF() {return this.myFormUser.get('email');}
get passwordF() {return this.myFormUser.get('password');}




}

