import { Admin } from '../../shared/models/admin.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  admins: Observable<Admin[]>;
  students: Observable<Admin[]>;
  photo: any;

  private adminsCollection: AngularFirestoreCollection<Admin>;
  private studentsCollection: AngularFirestoreCollection<Admin>;


  constructor(private readonly afs: AngularFirestore, private afAuth: AngularFireAuth, private storage: AngularFireStorage) {
    this.adminsCollection = afs.collection<Admin>('Administradores');
    this.studentsCollection = afs.collection<Admin>('Usuarios');
    this.getAdmins();
    this.getStudents();
  }


  onDeleteAdmins(adminId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.adminsCollection.doc(adminId).delete();
        resolve(result);

      } catch (err) {
        reject(err.message);
      }
    });
  }

  onDeleteStudents(studentId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.studentsCollection.doc(studentId).delete();
        resolve(result);

      } catch (err) {
        reject(err.message);
      }
    });
  }

  uploadImage(file: any, path: string, nombre: string): Promise<string> {
    return new Promise(resolve => {

      const filePath = path + '/' + nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe (res=>{
            const downloadURL = res;
            resolve(downloadURL);
            return;
          })
        })
      )
        .subscribe();
    });
  }

  onSaveAdmin(admin: Admin, adminId: string): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        this.afAuth.createUserWithEmailAndPassword(admin.email, admin.password);
        const id = adminId || this.afs.createId();
        const data = { id, ...admin };
        const result = await this.adminsCollection.doc(id).set(data);
        resolve(result);
        window.alert('Administrador registrado');
      } catch (err) {
        reject(err.message);
      }
    });
  }

  onSaveStudent(student: Admin, studentId: string): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        this.afAuth.createUserWithEmailAndPassword(student.email, student.password);
        const id = studentId || this.afs.createId();
        const data = { id, ...student };
        const result = await this.studentsCollection.doc(id).set(data);
        resolve(result);
        window.alert('Estudiante registrado');
      } catch (err) {
        reject(err.message);
      }
    });
  }


  private getAdmins(): void {
    this.admins = this.adminsCollection.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => a.payload.doc.data() as Admin))
    );
  }

  private getStudents(): void {
    this.students = this.studentsCollection.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => a.payload.doc.data() as Admin))
    );
  }
}