import { inject, Injectable, signal } from '@angular/core';
import {
  AddProfileLanguageInput,
  DeleteProfileLanguageInput,
  Language,
  UpdateProfileLanguageInput
} from '../../../core/models/core.model';
import { Apollo } from 'apollo-angular';
import {
  ADD_PROFILE_LANGUAGE,
  DELETE_PROFILE_LANGUAGE,
  LANGUAGES,
  PROFILE_LANGUAGES,
  UPDATE_PROFILE_LANGUAGE
} from './language.graphql';
import { map } from 'rxjs/operators';
import { ProfileResult } from '../user/user.model';
import {
  AddProfileLanguageResult,
  DeleteProfileLanguageResult,
  LanguagesResult,
  UpdateProfileLanguageResult
} from './language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private apollo = inject(Apollo);
  public languages = signal<Language[]>([]);

  public getAllLanguages() {
    return this.apollo.query<LanguagesResult>({ query: LANGUAGES }).pipe(
      map(res => {
        if (!res.data) throw new Error('No data');
        return res.data.languages;
      })
    );
  }

  public getProfileLanguages(userId: string) {
    return this.apollo.query<ProfileResult>({ query: PROFILE_LANGUAGES, variables: { userId } }).pipe(
      map(res => {
        if (!res.data) throw new Error('No data');
        return res.data.profile.languages;
      })
    );
  }

  public addProfileLanguage(language: AddProfileLanguageInput) {
    return this.apollo.mutate<AddProfileLanguageResult>({
      mutation: ADD_PROFILE_LANGUAGE,
      variables: { language }
    }).pipe(
      map(res => res.data?.addProfileLanguage)
    );
  }

  public updateProfileLanguage(language: UpdateProfileLanguageInput) {
    return this.apollo.mutate<UpdateProfileLanguageResult>({
      mutation: UPDATE_PROFILE_LANGUAGE,
      variables: { language }
    }).pipe(map(res => res.data?.updateProfileLanguage));
  }

  public deleteProfileLanguage(language: DeleteProfileLanguageInput) {
    return this.apollo.mutate<DeleteProfileLanguageResult>({
      mutation: DELETE_PROFILE_LANGUAGE,
      variables: { language },
      refetchQueries: [{ query: PROFILE_LANGUAGES, variables: { userId: language.userId } }]
    }).pipe(map(res => res.data?.deleteProfileLanguage));
  }

}
