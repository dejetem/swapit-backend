import createHttpError from "http-errors";

import CommentRepository from "../repositories/comment.repository";



import {
  ICreateCommentDto
} from "../interfaces/dto/services/product.dto";
import {
  CreateCommentDto
} from "../interfaces/dto/repositories/product.dto";
import { Comment } from "../interfaces/product.model";
import { IFindAllProductCommentDto } from "../interfaces/dto/services/product.dto";

import { ProductValidationMessage } from "../validations/product.validations";

export default class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  /**
   * @function findOne
   * @description: Get a Comment by id
   * @param id: The Comment id.
   * @return Promise<Coment>
   */
  public async findOne(id: string): Promise<Comment> {
    let comment = await this.commentRepository.findById(id);

    if (!comment) {
      throw new createHttpError.NotFound(ProductValidationMessage.COMMENT_NOT_FOUND);
    }

    return comment;
  }
  
  /**
   * @function findOneProductComment
   * @description: Get list of comment by product id
   * @param product: The product id.
   * @return Promise<{ comment: Comment[] }>
   */
  public async findOneProductComment(product: any): Promise<
     {
      comment: Comment[];
      totalElements: number;
     }

  > {
    let comment: Comment[] = [];
    let totalElements: any;
    comment = await this.commentRepository.findOneProductComment(product);

    if (!comment) {
      throw new createHttpError.NotFound(ProductValidationMessage.COMMENT_NOT_FOUND);
    } else {
      return { comment, totalElements };
    }
  }


  /**
   * @function create
   * @description: Create Coment
   * @param ICreateCommentDto: An object of type CreateProductDto containing the Product information.
   * @return Promise<Product>
   */
  public async create(ICreateCommentDto: ICreateCommentDto): Promise<Comment | null> {
    let product: any = await this.findOne(ICreateCommentDto.product);
    if (!product) return null;
    const CreateCommentDto: CreateCommentDto = {
      description: ICreateCommentDto.description,
      creator: ICreateCommentDto.creator,
      name: ICreateCommentDto.name,
      product: ICreateCommentDto.product
    };
     
    let comment = await this.commentRepository.create(CreateCommentDto);
    product.comments.push(comment?.id)
    product.save()

    return comment;
  }



  /**
   * @function delete
   * @description Function that delete a Product
   * @param id The Product id
   * @return Promise<void>
   */
  public async delete(id: string): Promise<void> {
    let comment = await this.commentRepository.delete(id);

    if (!comment) {
      throw new createHttpError.NotFound(ProductValidationMessage.COMMENT_NOT_FOUND);
    }

    return;
  }
}
