import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
export interface Password {
  id?: string,
  password: any
}
@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private password: Observable<any>;
  private passwordCollection: AngularFirestoreCollection<Password>;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.passwordCollection = this.afs.collection<Password>('password');
    this.password = this.passwordCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const password = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...password };
        });
      })
    );

  }
  getPassword(): Observable<Password> {
    return this.passwordCollection.doc<Password>("O4ucec0vPlFDDSyBbD7x").valueChanges().pipe(
      take(1),
      map(password => {
        password.id = 'O4ucec0vPlFDDSyBbD7x';
        return password
      })
    );
  }
  updatePassword(password): Promise<void> {
    return this.passwordCollection.doc('O4ucec0vPlFDDSyBbD7x').update({ password: password.password });
  }
}
