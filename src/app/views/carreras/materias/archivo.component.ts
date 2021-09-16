import { Component, OnInit , ViewChild , ElementRef } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Publicacion } from '../../../shared/models/publicacion.interface';
import { Location } from '@angular/common';
import { ComentariosService } from './../../services/comentarios.service';
import { Comentario } from '../../../shared/models/comentario.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FirebaseauthService } from '../../services/firebaseauth.service';


@Component({
  templateUrl: './archivo.component.html',
})

export class ArchivoComponent implements OnInit{

  filepath='';
  Publicacion$ = this.datosSrv.publicaciones;
  Comentario$ = this.datosSrv.comentarios;
  publicacionForm: FormGroup;
  publicacion: Publicacion;
  listarPublicaciones: Publicacion[];
  listarComentarios: Comentario[];
  carreraId: string;
  materiaId: string;
  publicacionId: string;
  carrera: string;
  materia: string;
  nameMateria: any;
  idMat='';
  email: string;
  userLogIn: any;
  idUserPubli='';
  nameUser='';
  apellUser='';
  fotoUser='';
  fechaPubli= new Date();

  textoBuscar='';

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(
    private datosSrv: ThemeService,
    private router: Router,
    private fb: FormBuilder,
    private _location: Location,
    private comentariosServ: ComentariosService,
    //public sanitizer: DomSanitizer,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private serviceAuth: FirebaseauthService,
  ) { 
    const navigation = this.router.getCurrentNavigation();
    this.publicacion = navigation?.extras?.state?.value;
    this.initForm();
  }

  @ViewChild('FileUrlUser') inputFile: ElementRef;
  progreso=false;
  porcentaje=0;
  porcentajesubida: Observable<number>;
  urlFile: Observable<string>;

  ngOnInit(): void {

    this.serviceAuth.getCurrentUser().subscribe(user => {
      this.email = user.email;
      this.getAdmin();
    })

    if (typeof this.publicacion === 'undefined') {
      this.router.navigate(['/carreras']);
    }
    console.log(this.publicacion.id)
    this.materia = this.publicacion.idMateria;
    this.publicacionForm.patchValue(this.publicacion);

    this.obtenerComentarios(this.publicacion.id);
    this.getMateria(this.materia);

    if(this.publicacion.idCarrera=="TkiP9dMmAXyoscir6GqF"){
      this.carrera = "TS- Electromecánica";
    }else if(this.publicacion.idCarrera=="i6e9eP0YTsnowV8p8EKi"){
      this.carrera = "TS- Redes y Telecomunicaciones";
    }else if(this.publicacion.idCarrera=="iw6XSHR2NiPPkwMSjKBM"){
      this.carrera = "TS- Agua y Saneamiento Ambiental";
    }else if(this.publicacion.idCarrera=="ph4kM1eyF6KoaieJqCr0"){
      this.carrera = "TS- Desarrollo de Software";
    }
  }

  onSave(publi: Publicacion): void {

    try {
      if(this.publicacionForm.valid){
        publi.fecha=this.fechaPubli;
        publi.idUser=this.idUserPubli;
        publi.nameUser=this.nameUser;
        publi.apellUser=this.apellUser;
        publi.userFoto=this.fotoUser;
        publi.likes=0;
        publi.categoria= this.publicacion.categoria;
        const publicacionId = this.publicacion?.id || null;
        publi.idCarrera=this.publicacion.idCarrera;
        const idMateria=this.publicacion.idMateria;
        publi.file=this.inputFile.nativeElement.value;
        this.datosSrv.onSavePublicacion(publi, publicacionId, idMateria);
        this.publicacionForm.reset();
        this._location.back();
      }

    } catch (error) {
    console.log(error);
    }
  }

  public getAdmin() {

    this.firestore.collection('Administradores').ref.where('email', '==', this.email)
  
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.userLogIn=doc.data();
              this.nameUser=this.userLogIn.nombre;
              this.idUserPubli=this.userLogIn.id;
              this.apellUser=this.userLogIn.apellido;
              this.fotoUser=this.userLogIn.foto;
            });
        })
        .catch((error) => {
            console.log('Error getting documents:' , error);
        });
    }

  isValidField(field: string): string {
    const validatedField = this.publicacionForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  private initForm(): void {
    this.publicacionForm = this.fb.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      file: ['', [Validators.required]],
    });
  }

  obtenerComentarios(idM: string) {
    const path = 'Comentarios';
    this.comentariosServ.getCollection<Comentario>(path).subscribe(res => {
      this.listarComentarios = res.filter(e => idM === e.idPublicacion);
      //console.log(this.listaMaterias);
      this.listarComentarios.forEach(element => {
        this.publicacionId = element.idPublicacion;
        // console.log(element.nivel);
      });
    });
  }

  public getMateria(mat) {

    this.firestore.collection('Materias').ref.where('id', '==', mat)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.nameMateria=doc.data();
              this.idMat=this.nameMateria.nombre;
              console.log(this.idMat);
            });
        })
        .catch((error) => {
            console.log('Error getting documents:' , error);
        });
    }

  async onGoToDelete(comentarioId: string): Promise<void> {

    const confirmacion = confirm('Esta seguro que desea eliminar el comentario');

    if (confirmacion) {
      try {
        await this.datosSrv.onDeleteComentarios(comentarioId);
        alert('El comentario se elimino con exito');
      } catch (err) {
        console.log(err);
      }
    }
  }

  goBack() {
    this._location.back();
  }

    //SUBIR ARCHIVO
    uploadFile(pdf){
      //generar id Aleatorio para el archivo
      const id= Math.random().toString(36).substring(2);
      const file=pdf.target.files[0];
       this.filepath='Archivos/'+ this.nameUser+ '/'+'file_'+id;
      const ref=this.storage.ref(this.filepath);
      const tarea= this.storage.upload(this.filepath,file);
      this.porcentajesubida= tarea.percentageChanges();
      
      
      tarea.snapshotChanges().pipe(finalize(()=>this.urlFile=ref.getDownloadURL())).subscribe();
      this.progreso=true;
      //Cambia el porcentaje
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentaje = Math.round(porcentaje);
        if (this.porcentaje === 100) {
          this.progreso = false;
        }
      });
      
      }
}
