import { gql } from 'apollo-angular';

export const USERS = gql`
  query Users{
    users {
      id
      email
      profile {
        id
        first_name
        last_name
        full_name
        avatar
      }
      department {
        id
        name
      }
      position {
        id
        name
      }
      role
    }
  }
`;

export const USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      created_at
      email
      profile {
        id
        first_name
        last_name
        full_name
        avatar
      }
      department {
        id
        name
      }
      position {
        id
        name
      }
      is_verified
      role
    }
  }
`;

export const USER_CVS = gql`
  query UserCvs($userId: ID!) {
    user(userId: $userId) {
      id
      cvs {
        id
        created_at
        name
        education
        description
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      profile {
        id
        first_name
        last_name
        full_name
      }
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      affected
    }
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`
export const DELETE_AVATAR = gql`
  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
    }
  }
`


