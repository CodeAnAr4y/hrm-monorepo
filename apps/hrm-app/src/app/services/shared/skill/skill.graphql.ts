import { gql } from 'apollo-angular';


export const PROFILE_SKILLS = gql`
  query ProfileSkills($userId: ID!) {
    profile(userId: $userId) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`

export const SKILL_CATEGORIES = gql`
  query SkillCategories {
    skillCategories {
      id
      name
      parent {
        id
        name
      }
    }
  }
`
