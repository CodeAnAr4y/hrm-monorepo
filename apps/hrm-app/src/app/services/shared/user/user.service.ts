import { computed, inject, Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UpdateProfileResult, UploadAvatarResult, UserResult, UsersResult } from './user.model';
import { DELETE_AVATAR, UPDATE_PROFILE, UPDATE_USER, UPLOAD_AVATAR, USER, USERS } from './user.graphql';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, from, Observable } from 'rxjs';
import {
  Profile,
  UpdateProfileInput,
  UpdateUserInput,
  UploadAvatarInput,
  User,
  UserRole
} from '../../../core/models/core.model';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { jwtDecode } from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class UserService {
  private apollo = inject(Apollo);
  private snackBarService = inject(SnackBarService);

  public authenticatedUser = signal<User>({} as User);
  public selectedUser = signal<User>({ profile: {} } as User);
  public profile = signal<Profile>({} as Profile);
  public users = signal<User[]>([]);
  public isAdmin = computed(() => this.authenticatedUser().role === UserRole.Admin);

  public getUsers(): Observable<User[]> {
    return this.apollo.query<UsersResult>({ query: USERS }).pipe(
      map(res => res.data?.users || []),
      tap(users => this.users.set(users))
    );
  }

  public getUserById(userId: string) {
    return this.apollo.query<UserResult>({
      query: USER,
      variables: { userId },
      fetchPolicy: 'network-only'
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('No user data');
        return res.data.user;
      }),
      tap(userData => this.selectedUser.set(userData))
    );
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  }

  public uploadAvatar(file: File, userId: string): Observable<any> {
    return from(this.fileToBase64(file)).pipe(
      switchMap((base64String) => {
        const input: UploadAvatarInput = {
          userId: userId,
          base64: base64String,
          size: file.size,
          type: file.type
        };
        return this.apollo.mutate<UploadAvatarResult>({
          mutation: UPLOAD_AVATAR,
          variables: { avatar: input }
        }).pipe(catchError((error) => {
          this.snackBarService.openSnackBar('Files uploaded, but wasn\'t saved');
          return EMPTY;
        }));
      })
    );
  }

  public deleteAvatar(userId: string) {
    return this.apollo.mutate<null>({
      mutation: DELETE_AVATAR,
      variables: { userId }
    });
  }

  public updateUserData(user: UpdateUserInput) {
    return this.apollo.mutate<UserResult>({
      mutation: UPDATE_USER,
      variables: { user }
    }).pipe(map(res => {
        if (!res.data) throw new Error('No data');
        return res.data.user;
      }), tap(userData => this.selectedUser.set(userData))
    );
  }

  public updateAuthenticatedUserData(): Observable<UserResult['user']> {
    const token = localStorage.getItem('access_token') || '';
    const decoded: any = jwtDecode(token);
    const userId = decoded.sub;

    return this.apollo.query<UserResult>({
      query: USER,
      variables: { userId },
      fetchPolicy: 'network-only'
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('No signup data');
        this.authenticatedUser.set(res.data.user);
        return res.data.user;
      })
    );
  }

  public updateUserProfile(profile: UpdateProfileInput) {
    return this.apollo.mutate<UpdateProfileResult>({
      mutation: UPDATE_PROFILE,
      variables: { profile }
    }).pipe(map(res => {
      if (!res.data) throw new Error('No data');
      return res.data.updateProfile;
    }), tap(profileData => {
        this.getUserById(profileData.id).subscribe();
        this.updateAuthenticatedUserData().subscribe();
      }
    ));
  }

}
