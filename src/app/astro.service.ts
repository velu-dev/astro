import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  constructor(private afs: AngularFirestore, private http: HttpClient) {
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
    console.log(year)
    return this.yearCollection.doc(year.id).update({ year: year.year, data: year.data });
  }

  deleteYear(id: string): Promise<void> {
    return this.yearCollection.doc(id).delete();
  }
  generatePDF(data): Observable<any> {
    return this.http.post("https://astro-pdf.herokuapp.com/pdf", data)
  }
  initiateApp(): Observable<any> {
    return this.http.get("https://astro-pdf.herokuapp.com/")
  }
}
