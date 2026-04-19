import { inject, Injectable, signal } from '@angular/core';
import {
  AddCvProjectInput,
  CvProject,
  RemoveCvProjectInput,
  UpdateCvProjectInput
} from '../../../core/models/core.model';
import { ADD_CV_PROJECT, CV_PROJECTS, REMOVE_CV_PROJECT, UPDATE_CV_PROJECT } from './cv-project.graphql';
import { AddCvProjectResult, RemoveCvProjectResult, UpdateCvProjectResult } from './cv-project.model';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { CvResult } from '../cv/cv.model';

@Injectable({
  providedIn: 'root',
})
export class CvProjectService {
  private apollo = inject(Apollo);

  public cvProjects = signal<CvProject[]>([]);

  public getCvProjects(cvId: string) {
    return this.apollo.query<CvResult>({
      query: CV_PROJECTS,
      variables: { cvId },
      fetchPolicy: "network-only"
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.cvProjects.set(res.data.cv.projects || []);
        return res.data.cv;
      })
    );
  }

  public addCvProject(project: AddCvProjectInput) {
    return this.apollo.mutate<AddCvProjectResult>({
      mutation: ADD_CV_PROJECT,
      variables: { project }
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.reloadCvProjectsData(res.data.addCvProject.id);
        return res.data.addCvProject;
      })
    );
  }

  public updateCvProject(project: UpdateCvProjectInput) {
    return this.apollo.mutate<UpdateCvProjectResult>({
      mutation: UPDATE_CV_PROJECT,
      variables: { project }
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.reloadCvProjectsData(res.data.updateCvProject.id);
        return res.data.updateCvProject;
      })
    );
  }

  public removeCvProject(project: RemoveCvProjectInput) {
    return this.apollo.mutate<RemoveCvProjectResult>({
      mutation: REMOVE_CV_PROJECT,
      variables: { project },
      update: (cache) => {
        const id = cache.identify({ id: project.projectId, __typename: 'CvProject' });
        cache.evict({ id });
        cache.gc();
      }
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.reloadCvProjectsData(res.data.removeCvProject.id);
        return res.data.removeCvProject;
      })
    );
  }

  private reloadCvProjectsData(id: string) {
    console.log('reloading projects...');
    this.getCvProjects(id).subscribe();
  }
}
