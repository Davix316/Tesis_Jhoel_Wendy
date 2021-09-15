import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ComentariosInterface } from 'src/app/shared/comentarios';
import { PublicacionInterface } from 'src/app/shared/publicacion';
import { UserInterface } from 'src/app/shared/user';

@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.page.html',
  styleUrls: ['./puntuacion.page.scss'],
})
export class PuntuacionPage implements OnInit {

  listaComent: ComentariosInterface[];
  comentarios0: boolean
  votos: any;
  listaVotos = [];
  totalVotos: number;
  userInf: UserInterface = null;
  publicaciones: Array<PublicacionInterface> = [];
  private currentImage: any;
  foto: string;
  nombre: string;
  apellido: string

  public frog = [
    { src: '/assets/icon/png/001-award.png' },
    { src: '/assets/icon/png/015-idea.png' },
    { src: '/assets/icon/png/002-beer.png' },
    { src: '/assets/icon/png/022-mind blown.png' },
    { src: '/assets/icon/png/008-chocolate bar.png' },
    { src: '/assets/icon/png/016-vacation.png' },
    { src: '/assets/icon/png/026-rich.png' },
    { src: '/assets/icon/png/036-workout.png' },
    { src: '/assets/icon/png/034-hello.png' },
    { src: '/assets/icon/png/011-graduation.png' },
    { src: '/assets/icon/png/032-goal.png' },
    { src: '/assets/icon/png/035-stress.png' },
    { src: '/assets/icon/png/006-cauldron.png' },
    { src: '/assets/icon/png/028-selfie.png' },
    { src: '/assets/icon/png/022-mind blown.png' },
  ]

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private serviceFS: FirestoreService,
    private serviceauth: FireauthService, private router: Router,
    private fireService: FirestoreService,
    private cdRef: ChangeDetectorRef,
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.userInf = navigation?.extras?.state?.value;
    console.log('trae extraNav', this.userInf);

    //Si no hay ID de tarea retorna
    if (typeof this.userInf === 'undefined') {
      this.router.navigate(['/menu/perfil']);
    }

    this.foto = this.userInf.foto;
    this.nombre = this.userInf.nombre;
    this.apellido = this.userInf.apellido;
  }

  ngOnInit() {

    //INFORMACION DE USUARIO ACTUAL
    this.serviceauth.stateAuth().subscribe(user => {
      if (user != null) {
        //user.uid;
        this.getComentarios(user.uid)
      }
    });

    //console.log(this.totalVotos);
    this.getPublicacionCol();
    // this.cdRef.detectChanges();

  }



  //OBTENER COMENTARIOS
  getComentarios(idU: string) {

    this.serviceFS.getCollection<ComentariosInterface>('Comentarios').subscribe(res => {
      this.listaComent = res.filter(e => idU === e.idUser);
      if (this.listaComent.length === 0) {
        this.comentarios0 = true;
        this.totalVotos = 0;
      }
      else {
        this.totalVotos = 0;
        //console.log(this.listaComent);
        this.comentarios0 = false;
        this.listaComent.forEach(element => {

          //SUMA LOS VOTOS
          this.votos = element.voto;

          this.totalVotos += this.votos;
        });
        //console.log('total:', this.totalVotos);

      }
    });

  }


  //COLECCION
  getPublicacionCol() {
    this.fireService.getCollection<PublicacionInterface>('Publicaciones').subscribe(res => {
      this.publicaciones = res
    })
  }

  //STICKER
  RandomImage() {
    const r = Math.floor(Math.random() * (this.frog.length - 1)) + 0;;

    return this.frog[r];

  }

  getImage() {
    this.currentImage = this.RandomImage();
    return this.currentImage.src;
  }


  //NAVIGATION EXTRAS
  infoTarea(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['/menu/detalle-tarea'], this.navigationExtras);
  }

}
