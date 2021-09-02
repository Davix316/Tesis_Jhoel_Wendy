import { Component, OnInit , ViewChild , ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { Materia } from '../../../shared/models/materia.interface';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Publicacion } from '../../../shared/models/publicacion.interface';
import { PublicacionesService } from './../../services/publicaciones.service';
import { Location } from '@angular/common';
import { Admin } from '../../../shared/models/admin.interface';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { StructuredType } from 'typescript';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  templateUrl: './materias.component.html',
})
export class MateriasComponent implements OnInit {

  filepath='';

  Publicaciones$ = this.materiaSvc.publicaciones;
  publicacionForm: FormGroup;
  publicacion: Publicacion;
  materia: Materia = null;
  materiaForm: FormGroup;
  listarPublicaciones: Publicacion[];
  materiaId: string;
  carreraId: string;
  idUser: string;
  userInfo: any;
  idUserPubli='';
  nameUser='';
  apellUser='';
  fechaPubli= new Date();
  like='';
  id=this.publicacionesServ.getId();

  email: string;
  userLogIn: any;
  admin: Admin = {
    id: '',
    nombre: '',
    apellido: '',
    telefono: '',
    numUnico: '',
    carreraNombre: '',
    email: '',
    password: '',
    semestreRef: '',
    foto: '',
    rol: '',
  };

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };


  constructor(
    private router: Router,
    private materiaSvc: ThemeService,
    private publicacionSvc: ThemeService,
    private fb: FormBuilder,
    private publicacionesServ: PublicacionesService,
    private _location: Location,
    private serviceAuth: FirebaseauthService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.materia = navigation?.extras?.state?.value;
    this.initForm();
    this.initForm2();

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

    this.publicacionForm.patchValue(this.publicacion);

    if (typeof this.materia === 'undefined') {
      this.router.navigate(['/carreras']);
    }
    console.log(this.materia.id)
    console.log(this.materia.idCarrera)
    this.materiaForm.patchValue(this.materia);

    this.obtenerPublicaciones(this.materia.id);
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
          });
      })
      .catch((error) => {
          console.log('Error getting documents:' , error);
      });
  }

  goBack() {
    this._location.back();
  }

  onSave(): void {
    if (this.materiaForm.valid) {
      console.log("valido")
      const materia = this.materiaForm.value;
      const materiaId = this.materia?.id || null;
      const idCarrera = this.materia.idCarrera || null;
      this.carreraId = this.materia.idCarrera;

      this.materiaSvc.onSaveMateria2(materia, materiaId, idCarrera);
      this.materiaForm.reset();
      this.router.navigate(['/carreras']);
    } else {
      console.log("no valido")
    }
  }

  savePublicacion(publi: Publicacion){
    try {
      console.log(this.publicacionForm.value);
      if(this.publicacionForm.valid){
        publi.fecha=this.fechaPubli;
        publi.idUser=this.idUserPubli;
        publi.nameUser=this.nameUser;
        publi.apellUser=this.apellUser;
        publi.likes='0';
        publi.id=this.id;
        publi.idCarrera=this.materia.idCarrera;
        publi.idMateria=this.materia.id;
        publi.file=this.inputFile.nativeElement.value;
        this.publicacionSvc.newPublicacion(publi,this.id);
      }
    } catch (error) {
    console.log(error);
    }
  }



  obtenerPublicaciones(idM: string) {
    const path = 'Publicaciones';
    this.publicacionesServ.getCollection<Publicacion>(path).subscribe(res => {
      this.listarPublicaciones = res.filter(e => idM === e.idMateria);
      //console.log(this.listaMaterias);
      this.listarPublicaciones.forEach(element => {
        this.materiaId = element.idMateria;
        // console.log(element.nivel);
      });
    });
  }

  onGoToSee(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['carreras/archivo'], this.navigationExtras);
  }

  async onGoToDelete(publicacionId: string): Promise<void> {

    const confirmacion = confirm('Esta seguro que desea eliminar la publicación');

    if (confirmacion) {
      try {
        await this.materiaSvc.onDeletePublicaciones(publicacionId);
        alert('La pubicacion se elimino con exito');
      } catch (err) {
        console.log(err);
      }
    }
  }

  isValidField(field: string): string {
    const validatedField = this.materiaForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  isValidFieldP(field: string): string {
    const validatedField = this.publicacionForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  private initForm(): void {
    this.materiaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      numHoras: ['', [Validators.required]],
    });
  }

  private initForm2(): void {

    this.publicacionForm = this.fb.group({
      idCarrera: [this.materia.idCarrera],
      idMateria: [this.materia.id],
      fecha: ['01/01/2021'],
      nameUser: [this.nameUser],
      apellUser: [this.apellUser],
      idUser: [this.idUserPubli],
      file: ['', [Validators.required]],
      likes: ['0'],
      categoria: ['Tarea', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
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