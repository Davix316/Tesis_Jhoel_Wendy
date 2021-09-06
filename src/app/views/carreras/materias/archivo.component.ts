import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Publicacion } from '../../../shared/models/publicacion.interface';
import { Location } from '@angular/common';

@Component({
  templateUrl: './archivo.component.html',
})

export class ArchivoComponent implements OnInit{

  Publicacion$ = this.publicacionSvc.publicaciones;
  publicacionForm: FormGroup;
  publicacion: Publicacion;
  listarPublicaciones: Publicacion[];
  carreraId: string;
  materiaId: string;

  textoBuscar='';

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(
    private publicacionSvc: ThemeService,
    private router: Router,
    private fb: FormBuilder,
    private _location: Location,
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

  }

  onSave(): void {

    if (this.publicacionForm.valid) {
      console.log("valido")
      const publicacion = this.publicacionForm.value;
      const publicacionId = this.publicacion?.id || null;
      const idMateria = this.publicacion.idMateria || null;

      this.publicacionSvc.onSavePublicacion(publicacion, publicacionId, idMateria);
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

  goBack() {
    this._location.back();
  }
}
