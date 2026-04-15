import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DEPARTMENTS, POSITIONS } from './constants.graphql';
import { DepartmentsResult, PositionsResult } from './constants.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  private apollo = inject(Apollo);

  public loadDepartmentsList() {
    return this.apollo.query<DepartmentsResult>({ query: DEPARTMENTS }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        return res.data.departments;
      })
    );
  }

  public loadPositionsList() {
    return this.apollo.query<PositionsResult>({ query: POSITIONS }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        return res.data.positions;
      })
    );
  }
}
