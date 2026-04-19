import { inject, Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { CreateProjectInput, DeleteProjectInput, Project, UpdateProjectInput } from '../../../core/models/core.model';
import { CREATE_PROJECT, DELETE_PROJECT, PROJECTS, UPDATE_PROJECT } from './project.graphql';
import { CreateProjectResult, UpdateProjectResult } from './project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private apollo = inject(Apollo);

  public projects = signal<Project[]>([]);

  public getProjects() {
    return this.apollo.query<{ projects: Project[] }>({
      query: PROJECTS,
      fetchPolicy: 'network-only'
    }).pipe(
      map(res => {
        const projects = res.data?.projects || [];
        this.projects.set(projects);
        return projects;
      })
    );
  }

  public createProject(project: CreateProjectInput) {
    return this.apollo.mutate<CreateProjectResult>({ mutation: CREATE_PROJECT, variables: { project } }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.reloadProjectsData();
        return res.data.createProject;
      })
    );
  }

  public deleteProject(project: DeleteProjectInput) {
    return this.apollo.mutate({
      mutation: DELETE_PROJECT,
      variables: { project },
      update: (cache) => {
        const id = cache.identify({ id: project.projectId, __typename: 'Project' });
        cache.evict({ id });
        cache.gc();
      }
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.reloadProjectsData();
        return res.data;
      })
    );
  }

  public updateProject(project: UpdateProjectInput) {
    return this.apollo.mutate<UpdateProjectResult>({ mutation: UPDATE_PROJECT, variables: { project } }).pipe(
      map(res => {
        if (!res.data) throw new Error('no data');
        this.reloadProjectsData();
        return res.data.updateProject;
      })
    );;
  }

  private reloadProjectsData() {
    this.getProjects().subscribe();
  }
}
