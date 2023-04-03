import { Response, Request, NextFunction } from "express";
import { Request as JWTRequest } from "express-jwt";
import { validationResult } from "express-validator";
import UserService from "../services/user.service";

import {
  IFindAllUserDto,
  ICreateUserDto,
  IUpdateUserDto,
} from "../interfaces/dto/services/user.dto";

import { QuerySort } from "../../../../interfaces/models/query.enum";

import EnvironmentConfigs from "../../../../configs/environments";

import GeneralHelpers from "../../../../helpers/general.helper";

import ApiResponses from "../../../../helpers/api-responses.helper";

import { ResponseError } from "../../../../interfaces/error.interface";

export default class UserManagementController {
  constructor(private userService: UserService) {}

  public async findAll(req: JWTRequest, res: Response, next: NextFunction) {
    try {
      let { page, size, sort } = req.query;

      const sub: any = req.auth;

      const params: IFindAllUserDto = {
        page: Number(page) || 1,
        sort: (sort as QuerySort) || QuerySort.DESC,
        size: Number(size) || EnvironmentConfigs.getPaginationItemsPerPage(),
      };

      const { user, totalElements } = await this.userService.findAll(params);

      const response = GeneralHelpers.getPage(
        user,
        params.page as number,
        params.size as number,
        totalElements
      );

      res
        .status(200)
        .json(ApiResponses.success(response, "User successfully found."));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      let { id } = req.params;

      const user = await this.userService.findOne(id);

      res
        .status(200)
        .json(ApiResponses.success({ user }, "User successfully found."));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }

  public async create(req: JWTRequest, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error: ResponseError = new Error("Ce champ est obligatoire.");
        error.status = 422;
        error.data = errors.array();
        throw error;
      }

      const sub: any = req.auth;

      const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber
      } = req.body;

      const iCreateUserDto: ICreateUserDto = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber
      };
        const user = await this.userService.create(iCreateUserDto);

        res
          .status(201)
          .json(ApiResponses.success({ user }, "User successfully created."));

    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error: ResponseError = new Error("Ce champ est obligatoire.");
        error.status = 422;
        error.data = errors.array();
        throw error;
      }

      const { id } = req.params;

      const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber
      } = req.body;

      const iUpdateUserDto: IUpdateUserDto = {
        id,
        firstName,
        lastName,
        email,
        password,
        phoneNumber
      };

      const User = await this.userService.update(iUpdateUserDto);
      res
        .status(201)
        .json(ApiResponses.success({ User }, "User successfully updated."));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty) {
        const error: ResponseError = new Error("La validation a echouer.");
        error.status = 422;
        error.data = errors.array();
        throw error;
      }

      const { id } = req.params;

      await this.userService.delete(id);

      res
        .status(200)
        .json(ApiResponses.successMessage("User successfully delete", true));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }
}
