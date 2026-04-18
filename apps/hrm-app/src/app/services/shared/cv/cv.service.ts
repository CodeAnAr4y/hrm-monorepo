import { inject, Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CreateCvInput, Cv } from '../../../core/models/core.model';
import { CreateCvResult, CvResult, CvsResult } from './cv.model';
import { CREATE_CV, CV, CVS } from './cv.graphql';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private apollo = inject(Apollo);

  public selectedCv = signal<Cv>({} as Cv);
  public userCvs = signal<Cv[]>([]);

  public getCvById(cvId: string) {
    return this.apollo.query<CvResult>({ query: CV, variables: { cvId } }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.selectedCv.set(res.data.cv);
        return res.data.cv;
      })
    );
  }

  public getCvs() {
    return this.apollo.query<CvsResult>({ query: CVS, fetchPolicy: 'network-only' }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.userCvs.set(res.data.cvs);
        console.log(res.data.cvs);
        return res.data.cvs;
      })
    );
  }

  public createCv(cv: CreateCvInput) {
    return this.apollo.mutate<CreateCvResult>({ mutation: CREATE_CV, variables: { cv } }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        return res.data.createCv;
      })
    );
  }
}
