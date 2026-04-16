import { gql } from 'apollo-angular';

export const PROFILE_LANGUAGES = gql`
  query ProfileLanguages($userId: ID!) {
    profile(userId: $userId) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`

export const LANGUAGES = gql`
  query Languages {
    languages {
      id
      iso2
      name
      native_name
    }
  }
`

export const ADD_PROFILE_LANGUAGE = gql`
  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`

export const UPDATE_PROFILE_LANGUAGE = gql`
  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {
    updateProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`
export const DELETE_PROFILE_LANGUAGE = gql`
  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`
