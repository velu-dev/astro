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
export interface Colabs {
  id?: string,
  data: any
}
@Injectable({
  providedIn: 'root'
})
export class AstroService {

  private years: Observable<Years[]>;
  private colabs: Observable<Colabs[]>;
  private yearCollection: AngularFirestoreCollection<Years>;
  private colabCollection: AngularFirestoreCollection<Colabs>;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.yearCollection = this.afs.collection<Years>('years');
    this.colabCollection = this.afs.collection<Colabs>('colabs');
    this.years = this.yearCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.colabs = this.colabCollection.snapshotChanges().pipe(
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

  getColabData(): Observable<Colabs> {
    return this.colabCollection.doc<Colabs>("123").valueChanges().pipe(
      take(1),
      map(colab => {
        return colab
      })
    );
  }
  getColabs(): Observable<Colabs[]> {
    return this.colabs;
  }
  updateColabs(colabs: Colabs): Promise<void> {
    return this.colabCollection.doc(colabs.id).update({ data: colabs.data });
  }
  addColabs(colab: Colabs): Promise<DocumentReference> {
    return this.colabCollection.add(colab);
  }

  addYear(year: Years): Promise<DocumentReference> {
    return this.yearCollection.add(year);
  }

  updateYear(year: Years): Promise<void> {
    year.data.map((yy: any) => {
      Object.keys(yy).map((key: any) => {
        if (yy[key] === undefined) {
          yy[key] = "Enter Value"
        }
      })
    })
    return this.yearCollection.doc(year.id).update({ data: year.data });
  }
  updateYearname(year: Years): Promise<void> {
    return this.yearCollection.doc(year.id).update({ year: year.year });
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
