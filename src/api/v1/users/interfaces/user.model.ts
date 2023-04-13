export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  comments: string[];
  products: string[];
  resetToken?: string;
  resetTokenExpiration?: Date;
}
