import { FilterQuery } from "mongoose";

import ProductModel from "../models/product.model";
import CommentModel from "../models/comment.model";

import {
  CreateCommentDto,
} from "../interfaces/dto/repositories/product.dto";
import { Product, Comment } from "../interfaces/product.model";

import { IFindAllProductCommentDto } from "../interfaces/dto/services/product.dto";
import { QuerySort } from "../../../../interfaces/models/query.enum";

export default class CommentRepository {


  public async findById(id: string): Promise<Comment | null> {
    return await CommentModel.findById(id);
  }


  // public async findOneProductComment(product: string): Promise<Comment[]> {
  //   return await CommentModel.findById(product);
  // }

  public async findOneProductComment(
    IFindAllProductCommentDto: IFindAllProductCommentDto
  ): Promise<Comment[] | any> {
    if (IFindAllProductCommentDto.page && IFindAllProductCommentDto.size) {
      return await CommentModel.findById(IFindAllProductCommentDto.product)
        .skip((IFindAllProductCommentDto.page - 1) * IFindAllProductCommentDto.size)
        .limit(IFindAllProductCommentDto.size)
        .sort({ createdAt: IFindAllProductCommentDto.sort as QuerySort });
    }
    return await CommentModel.findById(IFindAllProductCommentDto.product).sort({
      createdAt: IFindAllProductCommentDto.sort as QuerySort,
    });
  }


  public async create(
    CreateCommentDto: CreateCommentDto
  ): Promise<Comment | null> {
    const product = await ProductModel.findById(CreateCommentDto.product);
    if (!product) return null;
    const newComment: any = await CommentModel.create({
      description: CreateCommentDto.description,
      creator: CreateCommentDto.creator,
      name: CreateCommentDto.name,
      product: CreateCommentDto.product
    });
    product.comments.push(newComment._id)
    product.save()
    return newComment;
  }

  public async delete(id: string): Promise<Comment  | null> {
    const comment = await CommentModel.findById(id);
    if (!comment) return null;

    return await comment.remove();
  }

}
