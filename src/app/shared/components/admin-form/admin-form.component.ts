import { ThemeService } from '../../../views/services/theme.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../models/admin.interface';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {

  admin: Admin;
  adminForm: FormGroup;

  private isEmail = /\S+@\S+\.\S+/;

  constructor(private router: Router, private fb: FormBuilder, private adminsSvc: ThemeService) {
    const navigation = this.router.getCurrentNavigation();
    this.admin = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if (typeof this.admin === 'undefined') {
      this.router.navigate(['newAdmin']);
    } else {
      this.adminForm.patchValue(this.admin);
    }
  }

  onSave(): void {
    
    if (this.adminForm.valid) {
      console.log("valido")
      const admin = this.adminForm.value;
      const adminId = this.admin?.id || null;
      this.adminsSvc.onSaveAdmin(admin, adminId);
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
      foto: ['', [Validators.required]],
    });
  }

}