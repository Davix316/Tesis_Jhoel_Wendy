import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import {Materia} from '../../../shared/models/materia.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Publicacion } from '../../../shared/models/publicacion.interface';
import { PublicacionesService } from './../../services/publicaciones.service';

@Component({
  templateUrl: './materias.component.html',
})
export class MateriasComponent implements OnInit{

  Publicaciones$ = this.materiaSvc.publicaciones;

  materia: Materia = null;
  materiaForm: FormGroup;
  listarPublicaciones: Publicacion[];
  materiaId: string;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router, 
    private materiaSvc: ThemeService,
    private fb: FormBuilder,
    private publicacionesServ: PublicacionesService,
  ) { 
    const navigation = this.router.getCurrentNavigation();
    this.materia = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if (typeof this.materia === 'undefined') {
      this.router.navigate(['/carreras']);
    }
    console.log(this.materia.id)
    console.log(this.materia.idCarrera)
    this.materiaForm.patchValue(this.materia);

    this.obtenerPublicaciones(this.materia.id);
  }

  onSave(): void {

    if (this.materiaForm.valid) {
      console.log("valido")
      const materia = this.materiaForm.value;
      const materiaId = this.materia?.id || null;
      const idCarrera = this.materia.idCarrera || null;

      this.materiaSvc.onSaveMateria2(materia, materiaId, idCarrera);
      this.materiaForm.reset();
      this.router.navigate(['/carreras']);
    }else{
      console.log("no valido")
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

  private initForm(): void {
    this.materiaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      numHoras: ['', [Validators.required]],
    });
  }

}
