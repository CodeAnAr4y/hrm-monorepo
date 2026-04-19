import { inject, Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Project, CreateProjectInput, DeleteProjectInput } from '../../../core/models/core.model';
import { PROJECTS, CREATE_PROJECT, DELETE_PROJECT } from './project.graphql'; // Создай эти GQL запросы

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private apollo = inject(Apollo);

  public userProjects = signal<Project[]>([]);

  public getProjects() {
    return this.apollo.query<{ projects: Project[] }>({
      query: PROJECTS,
      fetchPolicy: 'network-only'
    }).pipe(
      map(res => {
        const projects = res.data?.projects || [];
        this.userProjects.set(projects);
        return projects;
      })
    );
  }

  public createProject(project: CreateProjectInput) {
    return this.apollo.mutate({ mutation: CREATE_PROJECT, variables: { project } });
  }

  public deleteProject(input: DeleteProjectInput) {
    return this.apollo.mutate({ mutation: DELETE_PROJECT, variables: { input } });
  }
}
