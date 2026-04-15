import { Cv, Profile, Skill, SkillCategory } from '../../../core/models/core.model';

export type SkillCategoriesResult = {
  skillCategories: SkillCategory[]
}

export type AddProfileSkillResult = {
  addProfileSkill: Profile
}

export type SkillsResult = {
  skills: Skill[]
}

export type DeleteProfileSkillResult = {
  deleteProfileSkill: Profile
}

export type UpdateProfileSkillResult = {
  updateProfileSkill: Profile
}
