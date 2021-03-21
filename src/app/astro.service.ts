import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Years {
  id?: string,
  year: string,
  data: any
}
@Injectable({
  providedIn: 'root'
})
export class AstroService {

  private years: Observable<Years[]>;
  private yearCollection: AngularFirestoreCollection<Years>;

  constructor(private afs: AngularFirestore) {
    this.yearCollection = this.afs.collection<Years>('years');
    this.years = this.yearCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getYears(): Observable<Years[]> {
    return this.years;
  }

  getYear(id: string): Observable<Years> {
    return this.yearCollection.doc<Years>(id).valueChanges().pipe(
      take(1),
      map(year => {
        year.id = id;
        return year
      })
    );
  }

  addYear(year: Years): Promise<DocumentReference> {
    return this.yearCollection.add(year);
  }

  updateYear(year: Years): Promise<void> {
    return this.yearCollection.doc(year.id).update({ year: year.year, });
  }

  deleteYear(id: string): Promise<void> {
    return this.yearCollection.doc(id).delete();
  }
}
