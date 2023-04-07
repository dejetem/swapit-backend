export interface TokenPayload {
  userId: string;
  userType: UserType;
}
export interface TeamMemberTokenPayload {
  userId: string;
  userType: UserType;
  teamMemberInstitutionId: string | undefined
}

export enum UserType {
  USER = "USER",
}
