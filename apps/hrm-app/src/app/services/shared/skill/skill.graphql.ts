import { gql } from 'apollo-angular';
import { AddCvSkillInput } from '../../../core/models/core.model';


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

export const ADD_PROFILE_SKILL = gql`
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`

export const DELETE_PROFILE_SKILL = gql`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`

export const SKILLS = gql`
  query Skills {
    skills {
      id
      name
      category {
        id
        order
      }
      category_name
      category_parent_name
    }
  }
`
