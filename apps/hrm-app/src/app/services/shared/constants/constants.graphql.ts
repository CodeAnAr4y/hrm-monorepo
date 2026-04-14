import { gql } from 'apollo-angular';

export const DEPARTMENTS = gql`
  query Departments {
    departments {
      id
      name
    }
  }
`
export const POSITIONS = gql`
  query Positions {
    positions {
      id
      name
    }
  }
`
