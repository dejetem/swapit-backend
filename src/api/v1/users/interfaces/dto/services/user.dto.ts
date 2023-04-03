import { FindAllDto } from "../../../../../../interfaces/models/query.interface";
import { UserInformation } from "../../../../../../interfaces/models/user-information.interface copy";

export interface IFindAllUserDto extends FindAllDto {}

export interface IFindUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumbers: string;
}

export interface ICreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface IUpdateUserDto {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
}
