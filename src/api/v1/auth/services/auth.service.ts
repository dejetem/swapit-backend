import createHttpError from "http-errors";

import PasswordHelpers from "../../../../helpers/password.helper";
import GeneralHelpers from "../../../../helpers/general.helper";

import UserService from "../../users/services/user.service";

import { IResetUserPasswordDto, IUpdateUserDto, } from "../../users/interfaces/dto/services/user.dto";
import { UserType } from "../../../../interfaces/token-payload.interface";

import { AuthValidationMessages } from "../validations/auth.validation";

export default class AuthService {
  constructor(
    private userService: UserService,
  ) {}

  public async authenticate(
    email: string,
    password: string
  ): Promise<string> {
    let token = "";

    const user = await this.userService.findByEmail(email);
    
    if (user) {
      if (!user.password) {
        throw new createHttpError.Forbidden(
          AuthValidationMessages.INCORRECT_PASSWORD
        );
      }
      const isEqual = await PasswordHelpers.comparePasswords(
        password,
        user.password
      );
      if (!isEqual) {
        throw new createHttpError.Forbidden(
          AuthValidationMessages.INCORRECT_PASSWORD
        );
      }
    
      token = GeneralHelpers.generateUserToken({
        userId: user.id,
        userType: UserType.USER,
      });

      const iUpdateTeacherDto: IUpdateUserDto = {
        id: user.id,
        lastConnectionDate: new Date(),
      };
      await this.userService.update(iUpdateTeacherDto);
    }

    if (!user) {
      throw new createHttpError.Forbidden(
        AuthValidationMessages.INCORRECT_EMAIL
      );
    }

    return token;
  }

  public async sendResetPasswordEmail(email: string): Promise<void> {
    let user: any = await this.userService.findByEmail(email);
    if (user) {
      user = await this.userService.generateResetPasswordToken(user.id);
    } else {
      user = await this.userService.findByEmail(email);
      if (!user) {
        throw new createHttpError.Forbidden(
          AuthValidationMessages.INCORRECT_USERNAME
        );
      }

      user = await this.userService.generateResetPasswordToken(user.id);
    }

    /**
     * TODO
     * @description Send reset password email to user.email
     */
    return;
  }

  public async resetPassword(
    requestId: string,
    password: string
  ): Promise<void> {
    let isUser = true;
    let user: any = await this.userService.findByResetPasswordRequestId(
      requestId
    );
    if (!user) {
      isUser = false;
      user = await this.userService.findByResetPasswordRequestId(requestId);
    }
    if (!user) {
      throw new createHttpError.Forbidden(
        AuthValidationMessages.INCORRECT_RESET_PASSWORD_REQUEST_ID
      );
    }

    if (isUser) {
      const iResetTeacherPasswordDto: IResetUserPasswordDto = {
        id: user.id,
        resetPasswordRequestId: undefined,
        password,
      };
      await this.userService.resetUserPassword(iResetTeacherPasswordDto);
    } else {
      const iResetAdminPasswordDto: IResetUserPasswordDto = {
        id: user.id,
        resetPasswordRequestId: undefined,
        password,
      };
      await this.userService.resetUserPassword(iResetAdminPasswordDto);
    }
    return;
  }
}
