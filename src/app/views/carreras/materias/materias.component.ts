import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import {Materia} from '../../../shared/models/materia.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './materias.component.html',
})
export class MateriasComponent implements OnInit{

  materia: Materia = null;
  materiaForm: FormGroup;


  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router, 
              private materiaSvc: ThemeService,
              private fb: FormBuilder
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

  private initForm(): void {
    this.materiaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      numHoras: ['', [Validators.required]],
    });
  }

}
