import { UserInformation } from "../../../../../../interfaces/models/user-information.interface copy";

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface UpdateUserDto {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  resetPasswordRequestId?: string | undefined | null;
}
