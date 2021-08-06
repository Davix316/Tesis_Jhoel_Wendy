import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Materia } from '../../../shared/models/materia.interface';


@Component({
  selector: 'app-sistemas',
  templateUrl: 'sistemas.component.html',
})
export class SistemasComponent implements OnInit {
 
  Materias$ = this.materiaSvc.materias;
  materiaForm: FormGroup;
  materia: Materia;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private materiaSvc: ThemeService, private router: Router, private fb: FormBuilder,) {
    const navigation = this.router.getCurrentNavigation();
    this.materia = navigation?.extras?.state?.value;
    this.initForm();
   }


  ngOnInit(): void {

    this.materiaForm.patchValue(this.materia);
  }

  onGoToSee(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['carreras/materias'], this.navigationExtras);
  }

  async onGoToDelete(materiaId: string): Promise<void> {
    try {
      await this.materiaSvc.onDeleteMaterias(materiaId);
      alert('La materia se elimino con exito');
    } catch (err) {
      console.log(err);
    }
  }


  onSave(): void {

    if (this.materiaForm.valid) {
      console.log("valido")
      const materia = this.materiaForm.value;
      const materiaId = this.materia?.id || null;
      this.materiaSvc.onSaveMateria(materia, materiaId);
      this.materiaForm.reset();
      this.router.navigate(['carreras/sistemas']);
    }else{
      console.log("no valido")
    }
  }

  isValidField(field: string): string {
    const validatedField = this.materiaForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  onGoBackToList(): void {
    this.router.navigate(['carreras']);
  }

  private initForm(): void {
    this.materiaForm = this.fb.group({
      idCarrera: ['ph4kM1eyF6KoaieJqCr0'],
      nivel: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      numHoras: ['', [Validators.required]],
    });
  }

}

