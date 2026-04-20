import { inject, Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  ADD_PROFILE_SKILL,
  DELETE_PROFILE_SKILL,
  PROFILE_SKILLS,
  SKILL_CATEGORIES,
  SKILLS,
  UPDATE_PROFILE_SKILL
} from './skill.graphql';
import { map } from 'rxjs/operators';
import { ProfileResult } from '../user/user.model';
import {
  AddProfileSkillResult,
  DeleteProfileSkillResult,
  SkillCategoriesResult,
  SkillsResult, UpdateProfileSkillResult
} from './skill.model';
import {
  AddProfileSkillInput,
  DeleteProfileSkillInput, SkillMastery,
  UpdateProfileSkillInput
} from '../../../core/models/core.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apollo = inject(Apollo);

  public userSkills = signal<SkillMastery[]>([])

  public getUserSkills(userId: string) {
    return this.apollo.query<ProfileResult>({ query: PROFILE_SKILLS, variables: { userId } }).pipe(
      map(res => {
        if (!res.data) throw new Error('No data');
        this.userSkills.set(res.data.profile.skills);
        return res.data.profile;
      })
    );
  }

  public getSkillCategories() {
    return this.apollo.query<SkillCategoriesResult>({ query: SKILL_CATEGORIES }).pipe(
      map(res => {
        if (!res.data) throw new Error('No data');
        return res.data.skillCategories;
      })
    );
  }

  public addUserSkill(skill: AddProfileSkillInput) {
    return this.apollo.mutate<AddProfileSkillResult>({
      mutation: ADD_PROFILE_SKILL,
      variables: { skill },
      refetchQueries: [{ query: PROFILE_SKILLS, variables: { userId: skill.userId } }]
    }).pipe(map(res => res.data?.addProfileSkill));
  }

  public getAllSkills() {
    return this.apollo.query<SkillsResult>({ query: SKILLS }).pipe(
      map(res => {
        if (!res.data) throw new Error('No data');
        return res.data.skills;
      })
    );
  }

  public deleteProfileSkill(skill: DeleteProfileSkillInput) {
    return this.apollo.mutate<DeleteProfileSkillResult>({
      mutation: DELETE_PROFILE_SKILL,
      variables: { skill },
      refetchQueries: [{ query: PROFILE_SKILLS, variables: { userId: skill.userId } }]
    }).pipe(map(res => res.data?.deleteProfileSkill));
  }

  public updateProfileSkill(skill: UpdateProfileSkillInput) {
    return this.apollo.mutate<UpdateProfileSkillResult>({
      mutation: UPDATE_PROFILE_SKILL,
      variables: {skill},
      refetchQueries: [{ query: PROFILE_SKILLS, variables: { userId: skill.userId } }]
    }).pipe(map(res => res.data?.updateProfileSkill));
  }
}
