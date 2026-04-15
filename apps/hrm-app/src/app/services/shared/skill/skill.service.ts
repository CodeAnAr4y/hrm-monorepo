import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { PROFILE_SKILLS, SKILL_CATEGORIES } from './skill.graphql';
import { map, tap } from 'rxjs/operators';
import { ProfileResult } from '../user/user.model';
import { SkillCategoriesResult } from './skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apollo = inject(Apollo);

  getUserSkills(userId: string) {
    return this.apollo.query<ProfileResult>({ query: PROFILE_SKILLS, variables: { userId } }).pipe(
      map(res => {
        if (!res.data) throw new Error('No user data');
        return res.data.profile;
      })
    );
  }

  getSkillCategories() {
    return this.apollo.query<SkillCategoriesResult>({ query: SKILL_CATEGORIES }).pipe(
      map(res => {
        if (!res.data) throw new Error('No user data');
        return res.data.skillCategories;
      })
    );
  }
}
