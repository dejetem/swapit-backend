import { FilterQuery } from "mongoose";

import ProductModel from "../models/product.model";

import {
  CreateProductDto,
  UpdateProductDto
} from "../interfaces/dto/repositories/product.dto";
import { IFindAllProductDto } from "../interfaces/dto/services/product.dto";
import { Product } from "../interfaces/product.model";

import { QuerySort } from "../../../../interfaces/models/query.enum";

export default class ProductRepository {
  public async countAll(): Promise<number> {
    return await this.count();
  }

  public async findAll(
    IFindAllProductDto: IFindAllProductDto
  ): Promise<Product[]> {
    if (IFindAllProductDto.page && IFindAllProductDto.size) {
      return await ProductModel.find()
        .skip((IFindAllProductDto.page - 1) * IFindAllProductDto.size)
        .limit(IFindAllProductDto.size)
        .sort({ createdAt: IFindAllProductDto.sort as QuerySort });
    }
    return await ProductModel.find().sort({
      createdAt: IFindAllProductDto.sort as QuerySort,
    });
  }

  public async findById(id: string): Promise<Product | null> {
    return await ProductModel.findById(id);
  }

  public async create(CreateProductDto: CreateProductDto): Promise<Product> {
    const product: any = await ProductModel.create({
      brandName: CreateProductDto.brandName,
      description: CreateProductDto.description,
      tags: CreateProductDto.tags,
      selectedFile: CreateProductDto.files,
      creator: CreateProductDto.creator,
      name: CreateProductDto.name,
    });
    return product;
  }

  public async update(
    UpdateProductDto: UpdateProductDto
  ): Promise<Product | null> {
    const product = await ProductModel.findById(UpdateProductDto.id);
    if (!product) return null;

    if (UpdateProductDto.brandName)
      product.brandName = UpdateProductDto.brandName;

    if (UpdateProductDto.description)
      product.description = UpdateProductDto.description;

    if (UpdateProductDto.tags) product.tags = UpdateProductDto.tags;

    // if (UpdateProductDto.files)
    //   product.files = UpdateProductDto.files;

    if (UpdateProductDto.likeCount)
      product.likeCount = UpdateProductDto.likeCount;
    
    if (UpdateProductDto.comments) product.comments = UpdateProductDto.comments;

    if (UpdateProductDto.creator) product.creator = UpdateProductDto.creator;

    if (UpdateProductDto.name) product.name = UpdateProductDto.name;

    return await product.save();
  }

  public async delete(id: string): Promise<Product | null> {
    const product = await ProductModel.findById(id);
    if (!product) return null;

    return await product.remove();
  }

  private async count(query?: FilterQuery<Product>): Promise<number> {
    if (query) {
      return await ProductModel.countDocuments(query);
    }
    return await ProductModel.countDocuments();
  }
}
