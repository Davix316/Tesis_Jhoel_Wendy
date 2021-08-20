import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { Materia } from '../../../shared/models/materia.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Publicacion } from '../../../shared/models/publicacion.interface';
import { PublicacionesService } from './../../services/publicaciones.service';
import { Location } from '@angular/common';
import { Admin } from '../../../shared/models/admin.interface';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  templateUrl: './materias.component.html',
})
export class MateriasComponent implements OnInit {

  Publicaciones$ = this.materiaSvc.publicaciones;
  publicacionForm: FormGroup;
  publicacion: Publicacion;
  materia: Materia = null;
  materiaForm: FormGroup;
  listarPublicaciones: Publicacion[];
  materiaId: string;
  carreraId: string;

  email: string;
  userLogIn: any;
  admin: Admin = {
    id: '',
    nombre: '',
    apellido: '',
    telefono: '',
    numUnico: '',
    carrera: '',
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
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.materia = navigation?.extras?.state?.value;
    this.initForm();
    this.initForm2();
  }

  ngOnInit(): void {

    this.serviceAuth.getCurrentUser().subscribe(user => {
      this.email = user.email;
      // console.log(user.uid);
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

  getAdmin() {
    this.firestore.collection('Administradores').ref.where('email', '==', this.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.userLogIn = doc.data();
          this.admin.nombre = this.userLogIn.nombre;
          this.admin.apellido = this.userLogIn.apellido;
          this.admin.telefono = this.userLogIn.telefono;
          this.admin.numUnico = this.userLogIn.numUnico;
          this.admin.carrera = this.userLogIn.carrera;
          this.admin.email = this.userLogIn.email;
          this.admin.password = this.userLogIn.password;
          this.admin.semestreRef = this.userLogIn.semestreRef;
          this.admin.foto = this.userLogIn.foto;
          this.admin.rol = this.userLogIn.rol;
          // console.log(doc.id, ' => ', doc.data());
        });
      })
      .catch((error) => {
        console.log('Error getting documents:', error);
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

  onSaveP(): void {
    if (this.publicacionForm.valid) {
      console.log("valido")
      const publicacion = this.publicacionForm.value;
      const publicacionId = this.publicacion?.id || null;
      const materiaId = this.materia?.id || null;
      const idCarrera = this.materia.idCarrera || null;
      const idUser = this.admin.id || null;
      const nameUser = this.admin.nombre || null;
      const apellUser = this.admin.apellido || null;

      this.publicacionSvc.onSavePublicacion2(
        publicacion, publicacionId, materiaId, idCarrera
        );
      this.publicacionForm.reset();
      this.router.navigate(['/carreras']);

      this.publicacionForm = this.fb.group({
        idCarrera: [this.materia.idCarrera],
        idMateria: [this.materia.id],
        fecha: ['01/01/2021'],
        nameUser: [this.admin.nombre],
        apellUser: [this.admin.apellido],
        idUser: [this.admin.id],
        file: ['', [Validators.required]],
        likes: ['0'],
        categoria: ['Tarea', [Validators.required]],
        titulo: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
      });


      console.log(this.admin.nombre)
    } else {
      console.log("no valido"),
        window.alert("Complete todos los campos")
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
    try {
      await this.materiaSvc.onDeletePublicaciones(publicacionId);
      alert('La pubicacion se elimino con exito');
    } catch (err) {
      console.log(err);
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
      nameUser: [this.admin.nombre],
      apellUser: [this.admin.apellido],
      idUser: [this.admin.id],
      file: ['', [Validators.required]],
      likes: ['0'],
      categoria: ['Tarea', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

}
