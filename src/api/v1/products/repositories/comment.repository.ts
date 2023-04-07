import { FilterQuery } from "mongoose";

import ProductModel from "../models/product.model";
import CommentModel from "../models/comment.model";

import {
  CreateCommentDto,
} from "../interfaces/dto/repositories/product.dto";
import { Product, Comment } from "../interfaces/product.model";


export default class ProductRepository {

  public async create(
    CreateCommentDto: CreateCommentDto
  ): Promise<Comment | null> {
    const product = await ProductModel.findById(CreateCommentDto.product);
    if (!product) return null;
    const new_product: any = await CommentModel.create({
      description: CreateCommentDto.description,
      creator: CreateCommentDto.creator,
      name: CreateCommentDto.name,
      product: CreateCommentDto.product
    });
    product.comments.push(new_product)
    return product;
  }

  public async delete(id: string): Promise<Comment  | null> {
    const comment = await CommentModel.findById(id);
    if (!comment) return null;

    return await comment.remove();
  }

}
