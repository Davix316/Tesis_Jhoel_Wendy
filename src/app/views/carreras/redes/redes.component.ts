import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Materia } from '../../../shared/models/materia.interface';
import { MateriasService } from './../../services/materias.service';

@Component({
  selector: 'app-redes',
  templateUrl: 'redes.component.html',
})
export class RedesComponent implements OnInit {
 
  Materias$ = this.materiaSvc.materias;
  materiaForm: FormGroup;
  materia: Materia;
  listaMaterias: Materia[] ;
  carreraId: string;
  nivelId: string;
  textoBuscar='';

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(
    private materiaSvc: ThemeService, 
    private router: Router, 
    private fb: FormBuilder,
    private materiasServ: MateriasService,
    ) 
    {
    const navigation = this.router.getCurrentNavigation();
    this.materia = navigation?.extras?.state?.value;
    this.initForm();
   }


  ngOnInit(): void {

    this.materiaForm.patchValue(this.materia);
    this.obtenerMaterias("i6e9eP0YTsnowV8p8EKi", "");

  }

  onGoToSee(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['carreras/materias'], this.navigationExtras);
  }

  async onGoToDelete(materiaId: string): Promise<void> {

    const confirmacion = confirm('Esta seguro que desea eliminar la materia');

    if (confirmacion) {
    try {
      await this.materiaSvc.onDeleteMaterias(materiaId);
      alert('La materia se elimino con exito');
    } catch (err) {
      console.log(err);
    }
  }
}


  onSave(): void {

    if (this.materiaForm.valid) {
      console.log("valido")
      const materia = this.materiaForm.value;
      const materiaId = this.materia?.id || null;
      this.materiaSvc.onSaveMateria(materia, materiaId);
      this.materiaForm.reset();
      this.router.navigate(['carreras/redes']);

      this.materiaForm = this.fb.group({
        idCarrera: ['i6e9eP0YTsnowV8p8EKi'],
        nivel: ['1', [Validators.required]],
        nombre: ['', [Validators.required]],
        numHoras: ['', [Validators.required]],
      });

    }else{
      console.log("no valido"),
      window.alert("Complete todos los campos")
    }
  }

  isValidField(field: string): string {
    const validatedField = this.materiaForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  obtenerMaterias(idC: string, niv: string) {
    const path = 'Materias';
    this.materiasServ.getCollection<Materia>(path).subscribe(res => {

      if (niv==""){
        this.listaMaterias = res.filter(e => idC === e.idCarrera);
      }else{
        this.listaMaterias = res.filter(e => idC === e.idCarrera && niv == e.nivel);
      }

      this.listaMaterias.forEach(element => {
        this.carreraId = element.id;
        //console.log(element.id);
      });

    });
  }

  buscar($event){
    console.log(this.textoBuscar);
    this.obtenerMaterias("i6e9eP0YTsnowV8p8EKi",this.textoBuscar)
  }
  
  private initForm(): void {
    this.materiaForm = this.fb.group({
      idCarrera: ['i6e9eP0YTsnowV8p8EKi'],
      nivel: ['1', [Validators.required]],
      nombre: ['', [Validators.required]],
      numHoras: ['', [Validators.required]],
    });
  }

}

