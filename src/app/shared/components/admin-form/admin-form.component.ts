import { ThemeService } from '../../../views/services/theme.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../models/admin.interface';
import {AngularFireStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {

  fotopath='';
  fotoUser='';

  admin: Admin;
  adminForm: FormGroup;

  private isEmail = /\S+@\S+\.\S+/;

  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private adminsSvc: ThemeService, 
    private storage: AngularFireStorage,
    ) {
    const navigation = this.router.getCurrentNavigation();
    this.admin = navigation?.extras?.state?.value;
    this.initForm();
  }

  @ViewChild('FotoUrlUser') inputFoto: ElementRef;
  progreso=false;
  porcentaje=0;
  porcentajesubida: Observable<number>;
  urlFoto: Observable<string>;

  ngOnInit(): void {

    if (typeof this.admin === 'undefined') {
      this.router.navigate(['newAdmin']);
    } else {
      this.adminForm.patchValue(this.admin);
    }
      this.fotoUser = this.admin.foto;
      console.log("foto", this.fotoUser)
  }

   onSave(adm): void {

    if (this.adminForm.valid) {
      console.log("valido")
      const admin = this.adminForm.value;
      const adminId = this.admin?.id || null;
      adm.foto=this.inputFoto.nativeElement.value;
      this.adminsSvc.onSaveAdmin(admin, adminId, adm.foto);
      this.adminForm.reset();
      this.router.navigate(['list']);
    }else{
      console.log("no valido")
    }
  }

  onGoBackToList(): void {
    this.router.navigate(['list']);
  }

  isValidField(field: string): string {
    const validatedField = this.adminForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  private initForm(): void {
    this.adminForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      carrera: ['', [Validators.required]],
      numUnico: ['', [Validators.required]],
      semestreRef: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      rol: ['Administrador'],
      foto:  ['', [Validators.required]],
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