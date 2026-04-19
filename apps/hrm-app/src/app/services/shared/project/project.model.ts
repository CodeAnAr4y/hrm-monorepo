import { Project } from 'nx/src/native';

export type ProjectsResult = {
  projects: Project[]
}

export type CreateProjectResult = {
  createProject: Project
}

export type UpdateProjectResult = {
  updateProject: Project
}
