import { gql } from 'apollo-angular';

const CvProject = `
  id
  project {
    id
  }
  name
  domain
  start_date
  end_date
  description
  environment
  roles
  responsibilities
`

export const CV_PROJECTS = gql`
  query CvProjects($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      projects {
        ${CvProject}
      }
    }
  }
`

export const ADD_CV_PROJECT = gql`
  mutation AddCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      id
      projects {
        ${CvProject}
      }
    }
  }
`

export const UPDATE_CV_PROJECT = gql`
  mutation UpdateCvProject($project: UpdateCvProjectInput!) {
    updateCvProject(project: $project) {
      id
      projects {
        ${CvProject}
      }
    }
  }
`

export const REMOVE_CV_PROJECT = gql`
  mutation RemoveCvProject($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
      id
      projects {
        ${CvProject}
      }
    }
  }
`

export const EXPORT_PDF = gql`
  mutation ExportPdf($pdf: ExportPdfInput!) {
    exportPdf(pdf: $pdf)
  }
`
