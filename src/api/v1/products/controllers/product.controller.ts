import { Response, Request, NextFunction } from "express";
import { Request as JWTRequest } from "express-jwt";
import { validationResult } from "express-validator";
import ProductService from "../services/product.service";

import {
  IFindAllProductDto,
  ICreateProductDto,
  IUpdateProductDto,
} from "../interfaces/dto/services/product.dto";

import { QuerySort } from "../../../../interfaces/models/query.enum";

import EnvironmentConfigs from "../../../../configs/environments";

import GeneralHelpers from "../../../../helpers/general.helper";

import ApiResponses from "../../../../helpers/api-responses.helper";

import { ResponseError } from "../../../../interfaces/error.interface";

export default class ProductManagementController {
  constructor(private productService: ProductService) {}

  public async findAll(req: JWTRequest, res: Response, next: NextFunction) {
    try {
      let { page, size, sort } = req.query;

      const sub: any = req.auth;

      const params: IFindAllProductDto = {
        page: Number(page) || 1,
        sort: (sort as QuerySort) || QuerySort.DESC,
        size: Number(size) || EnvironmentConfigs.getPaginationItemsPerPage(),
      };

      const { product, totalElements } = await this.productService.findAll(
        params
      );

      const response = GeneralHelpers.getPage(
        product,
        params.page as number,
        params.size as number,
        totalElements
      );

      res
        .status(200)
        .json(ApiResponses.success(response, "Prouducts successfully found."));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }

  public async findOne(req: JWTRequest, res: Response, next: NextFunction) {
    try {
      let { id } = req.params;

      const product = await this.productService.findOne(id);

      res
        .status(200)
        .json(ApiResponses.success({ product }, "Product successfully found."));
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

      const { brandName, description, tags, selectedFile, name } = req.body;

      const ICreateProductDto: ICreateProductDto = {
        brandName,
        description,
        tags,
        selectedFile,
        creator: sub.userId,
        name,
      };
      const product = await this.productService.create(ICreateProductDto);

      res
        .status(201)
        .json(
          ApiResponses.success({ product }, "Product successfully created.")
        );
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }

  public async update(req: JWTRequest, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error: ResponseError = new Error("Error");
        error.status = 422;
        error.data = errors.array();
        throw error;
      }

      const { id } = req.params;
      const {
        brandName,
        description,
        creator,
        name,
        tags,
        selectedFile,
        likeCount,
        comments,
      } = req.body;

      const IUpdateProductDto: IUpdateProductDto = {
        id,
        brandName,
        description,
        creator,
        name,
        tags,
        selectedFile,
        likeCount,
        comments,
      };

      const product = await this.productService.update(IUpdateProductDto);
      res
        .status(201)
        .json(
          ApiResponses.success({ product }, "Product successfully updated.")
        );
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }

  public async delete(req: JWTRequest, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty) {
        const error: ResponseError = new Error("Error");
        error.status = 422;
        error.data = errors.array();
        throw error;
      }

      const { id } = req.params;

      await this.productService.delete(id);

      res
        .status(200)
        .json(ApiResponses.successMessage("Product successfully delete", true));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }
}
