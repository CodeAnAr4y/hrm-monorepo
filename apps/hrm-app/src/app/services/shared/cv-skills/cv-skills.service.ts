import { inject, Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ADD_CV_SKILL, CV_SKILLS, DELETE_CV_SKILL, UPDATE_CV_SKILL } from './cv-skills.graphql';
import { map } from 'rxjs/operators';
import { CvResult } from '../cv/cv.model';
import {
  AddCvSkillInput,
  Cv,
  DeleteCvSkillInput,
  SkillMastery,
  UpdateCvSkillInput
} from '../../../core/models/core.model';
import { AddCvSkillResult, DeleteCvSkillResult, UpdateCvSkillResult } from './cv-skills.model';

@Injectable({
  providedIn: 'root'
})
export class CvSkillsService {
  private apollo = inject(Apollo);

  public cvSkills = signal<SkillMastery[]>([]);

  public getCvSkills(cvId: string) {
    return this.apollo.query<CvResult>({ query: CV_SKILLS, variables: { cvId }, fetchPolicy: "network-only" }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.cvSkills.set(res.data.cv.skills);
        return res.data.cv;
      })
    );
  }

  public addCvSkill(skill: AddCvSkillInput) {
    return this.apollo.mutate<AddCvSkillResult>({mutation: ADD_CV_SKILL, variables: {skill}}).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.reloadCvSkillsData(res.data.addCvSkill.id)
        return res.data.addCvSkill;
      })
    );
  }

  public updateCvSkill(skill: UpdateCvSkillInput) {
    return this.apollo.mutate<UpdateCvSkillResult>({mutation: UPDATE_CV_SKILL, variables: {skill}}).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.reloadCvSkillsData(res.data.updateCvSkill.id);
        return res.data.updateCvSkill;
      })
    );
  }

  public deleteCvSkill(skill: DeleteCvSkillInput) {
    return this.apollo.mutate<DeleteCvSkillResult>({
      mutation: DELETE_CV_SKILL,
      variables: {skill},
      update: (cache) => {
        const id = cache.identify({ id: skill.cvId, __typename: 'SkillMastery' });
        cache.evict({ id });
        cache.gc();
      }
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.reloadCvSkillsData(res.data.deleteCvSkill.id);
        return res.data.deleteCvSkill;
      })
    );
  }

  private reloadCvSkillsData(id: string) {
    this.getCvSkills(id).subscribe()
  }
}
