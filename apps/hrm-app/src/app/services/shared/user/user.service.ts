import { inject, Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UsersResult } from './user.model';
import { USERS } from './user.graphql';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/core.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apollo = inject(Apollo);
  public user = signal<User>({} as User);

  getUsers(): Observable<User[]> {
    return this.apollo.query<UsersResult>({
      query: USERS
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('No users data');
        return res.data.users;
      })
    );
  }
}
