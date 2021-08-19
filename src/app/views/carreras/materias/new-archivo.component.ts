import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Publicacion } from '../../../shared/models/publicacion.interface';
import { PublicacionesService } from './../../services/publicaciones.service';


@Component({
  templateUrl: './new-archivo.component.html',
})
export class NewArchivoComponent implements OnInit {

  publicacionForm: FormGroup;
  publicacion: Publicacion;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(
    private publicacionSvc: ThemeService,
    private router: Router,
    private fb: FormBuilder,
  ) { 
    const navigation = this.router.getCurrentNavigation();
    this.publicacion = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {

    this.publicacionForm.patchValue(this.publicacion);

  }

  onSave(): void {

    if (this.publicacionForm.valid) {
      console.log("valido")
      const publicacion = this.publicacionForm.value;
      const publicacionId = this.publicacion?.id || null;
      this.publicacionSvc.onSavePublicacion2(publicacion, publicacionId);
      this.publicacionForm.reset();
      this.router.navigate(['/carreras']);
      
      this.publicacionForm = this.fb.group({
        idCarrera: ['iw6XSHR2NiPPkwMSjKBM'],
        idMateria: ['0GU7nnvVnTbK6hYUelgj'],
        fecha: ['01/01/2021'],
        nameUser: ['Super'],
        apellUser: ['Admin'],
        idUser: ['YK35sTwC8GN7z2FcKHWp75Z0u4z2'],
        file: ['', [Validators.required]],
        likes: ['0'],
        categoria: ['Tarea', [Validators.required]],
        titulo: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
      });
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
      idCarrera: ['iw6XSHR2NiPPkwMSjKBM'],
      idMateria: ['0GU7nnvVnTbK6hYUelgj'],
      fecha: ['01/01/2021'],
      nameUser: ['Super'],
      apellUser: ['Admin'],
      idUser: ['YK35sTwC8GN7z2FcKHWp75Z0u4z2'],
      file: ['', [Validators.required]],
      likes: ['0'],
      categoria: ['Tarea', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }
}
