import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CreateUserInput, UpdateUserInput } from '../../../core/models/core.model';
import { CreateUserResult, UpdateUserResult } from '../user/user.model';
import { CREATE_USER, DELETE_USER, UPDATE_USER } from './admin.graphql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apollo = inject(Apollo);


  public createUser(user: CreateUserInput) {
    return this.apollo.mutate<CreateUserResult>({mutation: CREATE_USER, variables: {user}}).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        return res.data.createUser;
      })
    )
  }

  public updateUser(user: UpdateUserInput) {
    return this.apollo.mutate<UpdateUserResult>({mutation: UPDATE_USER, variables: {user}}).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        return res.data.updateUser;
      })
    )
  }

  public deleteUser(userId: string) {
    return this.apollo.mutate({
      mutation: DELETE_USER,
      variables: { userId },
      update: (cache) => {
        const id = cache.identify({ id: userId, __typename: 'User' });
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
