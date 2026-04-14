import { Profile, User } from '../../../core/models/core.model';

export type UsersResult = {
  users: User[]
}

export type UserResult = {
  user: User
}

export type CreateUserResult = {
  createUser: User
}

export type UpdateUserResult = {
  updateUser: User
}

export type UploadAvatarResult = {
  uploadAvatar: string
}

export type UpdateProfileResult = {
  updateProfile: Profile
}
