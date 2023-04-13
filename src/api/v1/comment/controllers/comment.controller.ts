import { Response, Request, NextFunction } from "express";
import { Request as JWTRequest } from "express-jwt";
import { validationResult } from "express-validator";
import CommentService from "../services/comment.service";

import {
  IFindAllCommentDto,
  ICreateCommentDto,
} from "../interfaces/dto/services/comment.dto";

import { QuerySort } from "../../../../interfaces/models/query.enum";

import EnvironmentConfigs from "../../../../configs/environments";

import GeneralHelpers from "../../../../helpers/general.helper";

import ApiResponses from "../../../../helpers/api-responses.helper";

import { ResponseError } from "../../../../interfaces/error.interface";

export default class CommentManagementController {
  constructor(private commentService: CommentService) {}

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      let { page, size, sort } = req.query;

      const params: IFindAllCommentDto = {
        page: Number(page) || 1,
        sort: (sort as QuerySort) || QuerySort.DESC,
        size: Number(size) || EnvironmentConfigs.getPaginationItemsPerPage(),
      };

      const { comments, totalElements } = await this.commentService.findAll(
        params
      );

      const response = GeneralHelpers.getPage(
        comments,
        params.page as number,
        params.size as number,
        totalElements
      );

      res
        .status(200)
        .json(ApiResponses.success(response, "Comments successfully found."));
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

      const comment = await this.commentService.findOne(id);

      res
        .status(200)
        .json(ApiResponses.success({ comment }, "Comment successfully found."));
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
        const error: ResponseError = new Error("Error");
        error.status = 422;
        error.data = errors.array();
        throw error;
      }

      const sub: any = req.auth;
      
      const { product, title, content } = req.body;

      const ICreateCommentDto: ICreateCommentDto = {
        title,
        product,
        content,
        creator: sub.userId,
      };

      const comment = await this.commentService.create(ICreateCommentDto);

      res
        .status(201)
        .json(
          ApiResponses.success({ comment }, "Comment successfully created.")
        );
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
        const error: ResponseError = new Error("Error");
        error.status = 422;
        error.data = errors.array();
        throw error;
      }

      const { id } = req.params;

      await this.commentService.delete(id);

      res
        .status(200)
        .json(ApiResponses.successMessage("Comment successfully delete", true));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }
}
