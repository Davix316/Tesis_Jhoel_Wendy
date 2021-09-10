import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Publicacion } from '../../../shared/models/publicacion.interface';
import { Location } from '@angular/common';
import { ComentariosService } from './../../services/comentarios.service';
import { Comentario } from '../../../shared/models/comentario.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './archivo.component.html',
})

export class ArchivoComponent implements OnInit{

  Publicacion$ = this.datosSrv.publicaciones;
  Comentario$ = this.datosSrv.comentarios;
  publicacionForm: FormGroup;
  publicacion: Publicacion;
  listarPublicaciones: Publicacion[];
  listarComentarios: Comentario[];
  carreraId: string;
  materiaId: string;
  publicacionId: string;

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
    public sanitizer: DomSanitizer,
  ) { 
    const navigation = this.router.getCurrentNavigation();
    this.publicacion = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {

    if (typeof this.publicacion === 'undefined') {
      this.router.navigate(['/carreras']);
    }
    console.log(this.publicacion.id)
    console.log(this.publicacion.idMateria)
    this.publicacionForm.patchValue(this.publicacion);

    this.obtenerComentarios(this.publicacion.id);

  }

  onSave(): void {

    if (this.publicacionForm.valid) {
      console.log("valido")
      const publicacion = this.publicacionForm.value;
      const publicacionId = this.publicacion?.id || null;
      const idMateria = this.publicacion.idMateria || null;

      this.datosSrv.onSavePublicacion(publicacion, publicacionId, idMateria);
      this.publicacionForm.reset();
      this.router.navigate(['/carreras']);
    } else {
      console.log("no valido"),
        window.alert("Complete todos los campos")
    }
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
}
