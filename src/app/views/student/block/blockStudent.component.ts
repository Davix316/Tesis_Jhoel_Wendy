import { ThemeService } from '../../services/theme.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../shared/models/admin.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Bloqueo } from '../../../shared/models/block.interface';
import { PublicacionesService } from './../../services/publicaciones.service';

@Component({
  selector: 'app-blockStudent',
  templateUrl: './blockStudent.component.html'
})
export class BlockStudentComponent implements OnInit {

  student: Admin = null;
  studentBlockForm: FormGroup;

  id=this.publicacionesServ.getId();
  motivoBlock= '';
  diasBlock= '';
  fechaBlockI= new Date();
  fechaBlockF= new Date();

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(
    private router: Router, 
    private adminsSvc: ThemeService,
    private fb: FormBuilder,
    private publicacionesServ: PublicacionesService,
    ) {
    const navigation = this.router.getCurrentNavigation();
    this.student = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if (typeof this.student === 'undefined') {
      this.router.navigate(['listStudent']);
    }else {
      this.studentBlockForm.patchValue(this.student);
    }

  }

  saveBloqueo(block: Bloqueo){
    try {
      if(this.studentBlockForm.valid){
        block.id=this.id;
        block.nombre=this.student.nombre;
        block.apellido=this.student.apellido;
        block.numUnico=this.student.numUnico;
        block.email=this.student.email;
        block.fechaI=this.fechaBlockI;
        block.fechaF=this.fechaBlockF;
        this.adminsSvc.newBlock(block,this.id);
        this.router.navigate(['listStudent']);
        console.log(block.dias);
      }
    } catch (error) {
    console.log(error);
    }
  }

  onGoBackToList(): void {
    this.router.navigate(['listStudent']);
  }

  isValidField(field: string): string {
    const validatedField = this.studentBlockForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  private initForm(): void {
    this.studentBlockForm = this.fb.group({
      nombre: [this.student.nombre],
      apellido: [this.student.apellido],
      numUnico: [this.student.numUnico],
      email: [this.student.email],
      motivo: ['', [Validators.required]],
      dias: ['', [Validators.required]],
      fechaI: [''],
      fechaF: [''],
    });
  }

}