import { ThemeService } from '../../../views/services/theme.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../models/admin.interface';
import {AngularFireStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  fotopath='';
  fotoUser='';

  student: Admin;
  studentForm: FormGroup;

  private isEmail = /\S+@\S+\.\S+/;

  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private adminsSvc: ThemeService, 
    private storage: AngularFireStorage
    
    ) {
    const navigation = this.router.getCurrentNavigation();
    this.student = navigation?.extras?.state?.value;
    this.initForm();
  }

  @ViewChild('FotoUrlUser') inputFoto: ElementRef;
  progreso=false;
  porcentaje=0;
  porcentajesubida: Observable<number>;
  urlFoto: Observable<string>;


  ngOnInit(): void {
    if (typeof this.student === 'undefined') {
      this.router.navigate(['newStudent']);
    } else {
      this.studentForm.patchValue(this.student);
    }
    this.fotoUser = this.student.foto;
  }
  
   onSave(adm): void {
    if(adm.carreraNombre === "TS- Electromecánica" ){
        adm.carreraId = "TkiP9dMmAXyoscir6GqF";
    }else 
    if(adm.carreraNombre === "TS- Redes y Telecomunicaciones" ){
        adm.carreraId = "i6e9eP0YTsnowV8p8EKi";
    }
    else 
    if(adm.carreraNombre === "TS- Agua y Saneamiento Ambiental" ){
        adm.carreraId = "iw6XSHR2NiPPkwMSjKBM";
    }else 
    if(adm.carreraNombre === "TS- Desarrollo de Software" ){
      adm.carreraId = "ph4kM1eyF6KoaieJqCr0";
    }

    if (this.studentForm.valid) {
      console.log("valido")
      const student = this.studentForm.value;
      const studentId = this.student?.id || null;
      adm.foto=this.inputFoto.nativeElement.value;
      this.adminsSvc.onSaveStudent(student, studentId, adm.foto);
      this.studentForm.reset();
      this.router.navigate(['listStudent']);
    }else{
      console.log("no valido");
    }
  }

  onGoBackToList(): void {
    this.router.navigate(['listStudent']);
  }

  isValidField(field: string): string {
    const validatedField = this.studentForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  private initForm(): void {
    
    this.studentForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      carreraNombre: ['', [Validators.required]],
      carreraId: ['ph4kM1eyF6KoaieJqCr0'],
      numUnico: ['', [Validators.required]],
      semestreRef: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      rol: ['estudiante'],
      foto:  [''],
    });
  }

  uploadFoto(foto){
    //generar id Aleatorio para el archivo
    const id= Math.random().toString(36).substring(2);
    const file=foto.target.files[0];
    this.fotopath='Perfil/'+ 'user_'+id;
    const ref=this.storage.ref(this.fotopath);
    const tarea= this.storage.upload(this.fotopath,file);
    this.porcentajesubida= tarea.percentageChanges();
    
    tarea.snapshotChanges().pipe(finalize(()=>this.urlFoto=ref.getDownloadURL())).subscribe();
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