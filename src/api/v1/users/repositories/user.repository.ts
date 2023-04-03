import { FilterQuery } from "mongoose";

import UserModel from "../models/user.model";

import {
  CreateUserDto,
  UpdateUserDto,
} from "../interfaces/dto/repositories/user.dto";
import { IFindAllUserDto } from "../interfaces/dto/services/user.dto";
import { User } from "../interfaces/user.model";

import { QuerySort } from "../../../../interfaces/models/query.enum";

export default class UserRepository {
  public async countAll(): Promise<number> {
    return await this.count();
  }

  public async findAll(iFindAllUserDto: IFindAllUserDto): Promise<User[]> {
    if (iFindAllUserDto.page && iFindAllUserDto.size) {
      return await UserModel.find()
        .skip((iFindAllUserDto.page - 1) * iFindAllUserDto.size)
        .limit(iFindAllUserDto.size)
        .sort({ createdAt: iFindAllUserDto.sort as QuerySort });
    }
    return await UserModel.find().sort({
      createdAt: iFindAllUserDto.sort as QuerySort,
    });
  }

  public async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {

    const user: any = await UserModel.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: createUserDto.password,
      phoneNumber: createUserDto.phoneNumber,
    });
    return user;
  }

  public async update(updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await UserModel.findById(updateUserDto.id);
    if (!user) return null;

    if (updateUserDto.firstName)
      user.firstName = updateUserDto.firstName;

    if (updateUserDto.lastName)
      user.lastName = updateUserDto.lastName;

    if (updateUserDto.email) user.email = updateUserDto.email;

    if (updateUserDto.lastName) user.lastName = updateUserDto.lastName;

    if (updateUserDto.phoneNumber) user.phoneNumber = updateUserDto.phoneNumber;

    return await user.save();
  }

  public async delete(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;

    return await user.remove();
  }

  private async count(query?: FilterQuery<User>): Promise<number> {
    if (query) {
      return await UserModel.countDocuments(query);
    }
    return await UserModel.countDocuments();
  }
}
