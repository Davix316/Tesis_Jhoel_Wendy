import { Admin } from '../../shared/models/admin.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  admins: Observable<Admin[]>;

  private adminsCollection: AngularFirestoreCollection<Admin>;

  constructor(private readonly afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.adminsCollection = afs.collection<Admin>('Usuarios');
    this.getAdmins();
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

  onSaveAdmin(admin: Admin, adminId: string): Promise<void> {
    
    return new Promise(async (resolve, reject) => {
      try {
        this.afAuth.createUserWithEmailAndPassword(admin.email,admin.password);
        const id = adminId || this.afs.createId();
        const data = { id, ...admin };
        const result = await this.adminsCollection.doc(id).set(data);
        resolve(result);
        window.alert('usuario registrado');
      } catch (err) {
        reject(err.message);
      }
    });
  }


  private getAdmins(): void {
    this.admins = this.adminsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Admin))
    );
  }

  
}