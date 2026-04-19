import { inject, Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CreateCvInput, Cv, DeleteCvInput, UpdateCvInput } from '../../../core/models/core.model';
import { CreateCvResult, CvResult, CvsResult, UpdateCvResult } from './cv.model';
import { CREATE_CV, CV, CVS, DELETE_CV, UPDATE_CV } from './cv.graphql';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private apollo = inject(Apollo);
  private userService = inject(UserService);

  public selectedCv = signal<Cv>({} as Cv);
  public userCvs = signal<Cv[]>([]);
  public selectedUser = this.userService.selectedUser;

  public getCvById(cvId: string) {
    return this.apollo.query<CvResult>({ query: CV, variables: { cvId } }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.selectedCv.set(res.data.cv);
        console.log("this.selectedCv is:", this.selectedCv());
        if (res.data.cv.user) {
          this.selectedUser.set(res.data.cv.user);
        }
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

  public updateCv(cv: UpdateCvInput) {
    return this.apollo.mutate<UpdateCvResult>({
      mutation: UPDATE_CV,
      variables: { cv }
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.selectedCv.set(res.data.updateCv);
        return res.data.updateCv;
      })
    );
  }

  public deleteCv(cv: DeleteCvInput) {
    return this.apollo.mutate({
      mutation: DELETE_CV,
      variables: { cv },
      update: (cache) => {
        const id = cache.identify({ id: cv.cvId, __typename: 'Cv' });
        cache.evict({ id });
        cache.gc();
      }
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        return res.data;
      })
    );
  }
}
