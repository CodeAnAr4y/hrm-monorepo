import { Language, Profile } from '../../../core/models/core.model';

export type LanguagesResult = {
  languages: Language[]
}

export type AddProfileLanguageResult = {
  addProfileLanguage: Profile
}
export type UpdateProfileLanguageResult = {
  updateProfileLanguage: Profile
}

export type DeleteProfileLanguageResult = {
  deleteProfileLanguage: Profile
}
