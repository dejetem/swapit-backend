import { UserInformation } from "../../../../interfaces/models/user-information.interface copy";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}
