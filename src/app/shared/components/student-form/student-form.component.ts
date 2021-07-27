import { ThemeService } from '../../../views/services/theme.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../models/admin.interface';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  student: Admin;
  studentForm: FormGroup;

  private isEmail = /\S+@\S+\.\S+/;

  constructor(private router: Router, private fb: FormBuilder, private adminsSvc: ThemeService, private storage: AngularFireStorage) {
    const navigation = this.router.getCurrentNavigation();
    this.student = navigation?.extras?.state?.value;
    this.initForm();
  }


  ngOnInit(): void {
    if (typeof this.student === 'undefined') {
      this.router.navigate(['newStudent']);
    } else {
      this.studentForm.patchValue(this.student);
    }
  }


  imagen(event){
    console.log(event.target.files);
  }
  
   onSave(): void {

    if (this.studentForm.valid) {
      console.log("valido")
      const student = this.studentForm.value;
      const studentId = this.student?.id || null;
      this.adminsSvc.onSaveStudent(student, studentId);
      this.studentForm.reset();
      this.router.navigate(['listStudent']);
    }else{
      console.log("no valido")
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
      carrera: ['', [Validators.required]],
      numUnico: ['', [Validators.required]],
      semestreRef: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      rol: ['Estudiante'],
      foto: '',
    });
  }

}