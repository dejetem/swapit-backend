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
  RESTAURANT = "RESTAURANT",
  ADMIN = "ADMIN",
  TEAMMEMBER = "TEAMMEMBER",
}
