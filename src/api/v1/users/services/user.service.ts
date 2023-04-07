import createHttpError from "http-errors";

import UserRepository from "../repositories/user.repository";

import GeneralHelpers from "../../../../helpers/general.helper";

import PasswordHelpers from "../../../../helpers/password.helper";

import {
  IFindAllUserDto,
  ICreateUserDto,
  IUpdateUserDto,
  IResetUserPasswordDto,
} from "../interfaces/dto/services/user.dto";
import {
  CreateUserDto,
  UpdateUserDto,
} from "../interfaces/dto/repositories/user.dto";
import { User } from "../interfaces/user.model";

import { UserValidationMessage } from "../validations/user.validations";

export default class UserService {
  constructor(private userRepository: UserRepository) {}

  /**
   * @function findAll
   * @description: Get User list
   * @param iFindAllUserDto: list sort by asc, number of page and document size
   * @return Promise<{ user: User[]; totalElements: number }>
   */
  public async findAll(iFindAllUserDto: IFindAllUserDto): Promise<{
    user: User[];
    totalElements: number;
  }> {
    let user: User[] = [];

    let totalElements = await this.userRepository.countAll();

    if (iFindAllUserDto.size === -1) {
      user = await this.userRepository.findAll({ sort: iFindAllUserDto.sort });
    } else {
      user = await this.userRepository.findAll({
        sort: iFindAllUserDto.sort,
        page: iFindAllUserDto.page,
        size: iFindAllUserDto.size,
      });
    }

    return { user, totalElements };
  }

  /**
   * @function findOne
   * @description: Get a user by id
   * @param id: The user id.
   * @return Promise<User>
   */
  public async findOne(id: string): Promise<User> {
    let user = await this.userRepository.findById(id);

    if (!user) {
      throw new createHttpError.NotFound(UserValidationMessage.NOT_FOUND);
    }

    return user;
  }

  /**
   * @function findByEmail
   * @description: Get a user by email
   * @param email: The user email.
   * @return Promise<User>
   */
  public async findByEmail(email: string): Promise<User> {
    let user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new createHttpError.NotFound(UserValidationMessage.NOT_FOUND);
    }

    return user;
  }

  /**
   * TODO
   * @function resetUserPassword
   * @description
   * @param iResetTeacherPasswordDto
   * @return void
   */
  public async resetUserPassword(
    iResetTeacherPasswordDto: IResetUserPasswordDto
  ): Promise<void> {
    const updateTeacherDto: UpdateUserDto = {
      id: iResetTeacherPasswordDto.id,
      password: iResetTeacherPasswordDto.password,
      resetPasswordRequestId: iResetTeacherPasswordDto.resetPasswordRequestId,
    };
    await this.userRepository.update(updateTeacherDto);

    return;
  }

  /**
   * @function findByResetPasswordRequestId
   * @description Get teacher by reset password request id
   * @param requestId The request id
   * @return Promise<Teacher | null>
   */
  public async findByResetPasswordRequestId(
    requestId: string
  ): Promise<User | null> {
    return await this.userRepository.findByResetPasswordRequestId(requestId);
  }

  /**
   * TODO
   * @function generateResetPasswordToken
   * @description
   * @param id
   * @return Promise<User | null>
   */
  public async generateResetPasswordToken(id: string): Promise<User | null> {
    return await this.userRepository.generateResetPasswordToken(id);
  }

  /**
   * @function create
   * @description: Create User
   * @param iCreateUserDto: An object of type CreateUserDto containing the User information.
   * @return Promise<User>
   */
  public async create(iCreateUserDto: ICreateUserDto): Promise<User> {
    //let phoneNumber = GeneralHelpers.getPhoneNumber(iCreateUserDto.phoneNumber);

    let hashPassword: string = await PasswordHelpers.hashPassword(
      iCreateUserDto.password
    );

    const createUserDto: CreateUserDto = {
      firstName: iCreateUserDto.firstName,
      lastName: iCreateUserDto.lastName,
      email: iCreateUserDto.email,
      password: hashPassword,
      phoneNumber: iCreateUserDto.phoneNumber,
    };

    let user = await this.userRepository.create(createUserDto);

    return user;
  }

  /**
   * @function update
   * @description: Update User
   * @param iUpdateUserDto: An object of type IUpdateUserDto containing the User information
   * @return Promise<User>
   */
  public async update(iUpdateUserDto: IUpdateUserDto): Promise<User> {
    let user: any = await this.findOne(iUpdateUserDto.id);

    const updateUserDto: UpdateUserDto = {
      id: iUpdateUserDto.id,
      firstName: iUpdateUserDto.firstName,
      lastName: iUpdateUserDto.lastName,
      email: iUpdateUserDto.email,
      password: iUpdateUserDto.password,
      phoneNumber: iUpdateUserDto.phoneNumber,
    };

    user = await this.userRepository.update(updateUserDto);
    return user;
  }

  /**
   * @function delete
   * @description Function that delete a User
   * @param id The User id
   * @return Promise<void>
   */
  public async delete(id: string): Promise<void> {
    let user = await this.userRepository.delete(id);

    if (!user) {
      throw new createHttpError.NotFound(UserValidationMessage.NOT_FOUND);
    }

    return;
  }
}
