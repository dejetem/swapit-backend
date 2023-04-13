import { FilterQuery } from "mongoose";

import CommentModel from "../models/comment.model";
import ProductModel from "../../products/models/product.model";
import UserModel from "../../users/models/user.model";

import { CreateCommentDto } from "../interfaces/dto/repositories/comment.dto";
import { Comment } from "../interfaces/comment.model";

import { IFindAllCommentDto } from "../interfaces/dto/services/comment.dto";
import { QuerySort } from "../../../../interfaces/models/query.enum";

export default class CommentRepository {
  public async countAll(): Promise<number> {
    return await this.count();
  }

  public async findAll({
    size,
    page,
    sort,
  }: IFindAllCommentDto): Promise<Comment[]> {
    if (page && size) {
      return await CommentModel.find()
        .skip((page - 1) * size)
        .limit(size)
        .sort({ createdAt: sort as QuerySort });
    }
    return await CommentModel.find().sort({ createdAt: sort as QuerySort });
  }

  public async findById(id: string): Promise<Comment | null> {
    return await CommentModel.findById(id);
  }

  public async create(
    createCommentDto: CreateCommentDto
  ): Promise<Comment | null> {
    const product = await ProductModel.findById(
      createCommentDto.product
    ).select("comments");
    const user = await UserModel.findById(createCommentDto.creator).select(
      "comments"
    );

    if (!product) {
      return null;
    } else {
      if (!user) {
        return null;
      } else {
        const newComment: any = await CommentModel.create({
          title: createCommentDto.title,
          content: createCommentDto.content,
          creator: createCommentDto.creator,
          product: createCommentDto.product,
        });

        product.comments.push(newComment._id);
        product.save();

        user.comments.push(newComment._id);
        user.save();

        return newComment;
      }
    }
  }

  public async delete(id: string): Promise<Comment | null> {
    const comment = await CommentModel.findById(id);
    if (!comment) return null;

    return await comment.remove();
  }

  private async count(query?: FilterQuery<Comment>): Promise<number> {
    if (query) {
      return await CommentModel.countDocuments(query);
    }
    return await CommentModel.countDocuments();
  }
}
