import { Admin } from '../../shared/models/admin.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Materia } from '../../shared/models/materia.interface';
import { Publicacion } from '../../shared/models/publicacion.interface';
import { Comentario } from '../../shared/models/comentario.interface';
import { Bloqueo } from '../../shared/models/block.interface';
import { Reporte } from '../../shared/models/reporte.interface';
import { FirebaseauthService } from '../../../app/views/services/firebaseauth.service';


@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  admins: Observable<Admin[]>;
  students: Observable<Admin[]>;
  studentsBlock: Observable<Admin[]>;
  materias: Observable<Materia[]>;
  publicaciones: Observable<Publicacion[]>;
  comentarios: Observable<Comentario[]>;
  reportes: Observable<Reporte[]>;

  photo: any;
  currentUser: any;
  token: string;
  idDoc: string;
  usuarioID: string;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  private adminsCollection: AngularFirestoreCollection<Admin>;
  private studentsCollection: AngularFirestoreCollection<Admin>;
  private studentsBlockCollection: AngularFirestoreCollection<Admin>;
  private materiasCollection: AngularFirestoreCollection<Materia>;
  private publicacionesCollection: AngularFirestoreCollection<Publicacion>;
  private comentariosCollection: AngularFirestoreCollection<Comentario>;
  private reportesCollection: AngularFirestoreCollection<Reporte>;


  constructor(
    private readonly afs: AngularFirestore, 
    private afAuth: AngularFireAuth, 
    private storage: AngularFireStorage, 
    public router: Router,
    private serviceAuth : FirebaseauthService, 
    ) {
    this.adminsCollection = afs.collection<Admin>('Administradores');
    this.studentsCollection = afs.collection<Admin>('Usuarios');
    this.studentsBlockCollection = afs.collection<Admin>('Bloqueos');
    this.materiasCollection = afs.collection<Materia>('Materias');
    this.publicacionesCollection = afs.collection<Publicacion>('Publicaciones');
    this.comentariosCollection = afs.collection<Comentario>('Comentarios');
    this.reportesCollection = afs.collection<Reporte>('Reportes');
    this.getAdmins();
    this.getStudents();
    this.getStudentsBloqueados();
    this.getMaterias();
    this.getPublicaciones();
    this.getComentarios();
    this.getReportes();
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

  onDeleteMaterias(materiaId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.materiasCollection.doc(materiaId).delete();
        resolve(result);

      } catch (err) {
        reject(err.message);
      }
    });
  }

  onDeletePublicaciones(publicacionId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.publicacionesCollection.doc(publicacionId).delete();
        resolve(result);

      } catch (err) {
        reject(err.message);
      }
    });
  }

  onDeleteComentarios(comentarioId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.comentariosCollection.doc(comentarioId).delete();
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

  onDeleteStudentsBlock(studentId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.studentsBlockCollection.doc(studentId).delete();
        resolve(result);

      } catch (err) {
        reject(err.message);
      }
    });
  }

  onDeleteReport(reporteId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.reportesCollection.doc(reporteId).delete();
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

  onSaveAdmin(admin: Admin, adminId: string, foto:string): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        this.afAuth.createUserWithEmailAndPassword(admin.email, admin.password);
        const id = adminId || this.afs.createId();
        const data = { id, foto, ...admin };
        const result = await this.adminsCollection.doc(id).set(data);
        resolve(result);
        window.alert('Administrador registrado');  
        const user = this.serviceAuth.login("super.admin@epn.edu.ec","appAdmin123")

      } catch (err) {
        reject(err.message);
      }
    });
  }

  onSaveAdmin2(admin1: Admin, adminId: string, email: string, foto:string): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        this.afAuth.createUserWithEmailAndPassword(admin1.email, admin1.password);
        const id = adminId || this.afs.createId();
        const data = { id, email, foto, ...admin1 };
        const result = await this.adminsCollection.doc(id).set(data);
        resolve(result);
        window.alert('Información guardada con exito');
        console.log("registro: ", admin1)
      } catch (err) {
        reject(err.message);
      }
    });
  }

    //REGISTRAR USUARIO
    registrar(usuario: Admin){
      this.afAuth.createUserWithEmailAndPassword(usuario.email,usuario.password)
       .then((userResponse)=>{
         // add the user to the "users" database
         usuario.id=userResponse.user.uid;
         //id del documento
        this.idDoc=userResponse.user.uid;
         //add the user to the database
         this.afs.collection('Administradores').doc(this.idDoc).set(usuario).then(ref=>{
          window.alert('Administrador registrado');
         });
  
       })
       .catch((err)=>{
          console.log('error de registro: ', err);
       });
  
      }


  onSaveStudent(student: Admin, studentId: string, foto:string): Promise<void> {

    console.log("id: ", studentId);

    if(studentId == null){
      return new Promise(async (resolve, reject) => {
        try {
          this.afAuth.createUserWithEmailAndPassword(student.email, student.password)
          .then((userResponse) => {
            this.usuarioID = userResponse.user.uid;
  
          const id = this.usuarioID;
          const data = { id, foto, ...student };
          const result = this.studentsCollection.doc(id).set(data);
          resolve(result);
          window.alert('Estudiante registrado');
          })
        } catch (err) {
          reject(err.message);
        }
      });
    }else{
      return new Promise(async (resolve, reject) => {
        try {
          const id = studentId;
          const data = { id, foto, ...student };
          const result = await this.studentsCollection.doc(id).set(data);
          this.afAuth.createUserWithEmailAndPassword(student.email, student.password);
          resolve(result);
          window.alert('Estudiante registrado');
        } catch (err) {
          reject(err.message);
        }
      });
    }
  }

  onSaveMateria2(materia: Materia, materiaId: string, idCarr: string): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        const id = materiaId || this.afs.createId();
        const idCarrera = idCarr;
        const data = { id, idCarrera, ...materia };
        const result = await this.materiasCollection.doc(id).set(data);
        resolve(result);
        window.alert('materia registrada');
      } catch (err) {
        reject(err.message);
      }
    });
  }

  onSaveMateria(materia: Materia, materiaId: string): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        const id = materiaId || this.afs.createId();
        const data = { id, ...materia };
        const result = await this.materiasCollection.doc(id).set(data);
        resolve(result);
        window.alert('materia registrada');
      } catch (err) {
        reject(err.message);
      }
    });
  }

  onSavePublicacion2(publicacion: Publicacion, publicacionId: string, idMateria: string, idCarrera:string, 
    ): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        const id = publicacionId || this.afs.createId();
        const data = { id, idMateria, idCarrera, ...publicacion };
        const result = await this.publicacionesCollection.doc(id).set(data);
        resolve(result);
        window.alert('publicación registrada');
      } catch (err) {
        reject(err.message);
      }
    });
  }

  newPublicacion(publicacion: Publicacion, idP: string){
    this.afs.collection('Publicaciones').doc(idP).set(publicacion)
  .then((docRef) => {
      console.log('registro exitoso');
      window.alert('publicación registrada');
      this.router.navigate(['/carreras']);
  })
  .catch((error) => {
      console.error('"Error adding document: "', error);
  });

  }

  newBlock(block: Bloqueo, idB: string){
    this.afs.collection('Bloqueos').doc(idB).set(block)
  .then((docRef) => {
      console.log('registro exitoso');
      window.alert('bloqueo registrado');
      this.router.navigate(['/dashboard']);
  })
  .catch((error) => {
      console.error('"Error adding document: "', error);
  });

  }



  onSavePublicacion(publicacion: Publicacion, publicacionId: string, idMat: string): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        const id = publicacionId || this.afs.createId();
        const idMateria = idMat;
        const data = { id, idMateria, ...publicacion };
        const result = await this.publicacionesCollection.doc(id).set(data);
        resolve(result);
        window.alert('publicación registrada');
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

  private getStudentsBloqueados(): void {
    this.studentsBlock = this.studentsBlockCollection.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => a.payload.doc.data() as Admin))
    );
  }

  private getMaterias(): void {
    this.materias = this.materiasCollection.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => a.payload.doc.data() as Materia))
    );
  }

  private getPublicaciones(): void {
    this.publicaciones = this.publicacionesCollection.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => a.payload.doc.data() as Publicacion))
    );
  }

  private getComentarios(): void {
    this.comentarios = this.comentariosCollection.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => a.payload.doc.data() as Comentario))
    );
  }

  private getReportes(): void {
    this.reportes = this.reportesCollection.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => a.payload.doc.data() as Reporte))
    );
  }
}