import createHttpError from "http-errors";

import CommentRepository from "../repositories/comment.repository";

import {
  ICreateCommentDto
} from "../interfaces/dto/services/comment.dto";
import {
  CreateCommentDto
} from "../interfaces/dto/repositories/comment.dto";
import { Comment } from "../interfaces/comment.model";
import { IFindAllCommentDto } from "../interfaces/dto/services/comment.dto";

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
   * @function findAll
   * @description Get the list of all admins
   * @param iFindAllAdminsDto An object of type IFindAllAdminsDto containing the query filters
   * @return Promise<{ admins: Admin[]; totalElements: number }>
   */
  public async findAll(
    iFindAllCommentDto: IFindAllCommentDto
  ): Promise<{ comments: Comment[]; totalElements: number }> {
    let comments: Comment[] = [];

    let totalElements = await this.commentRepository.countAll();

    if (iFindAllCommentDto.size === -1) {
      comments = await this.commentRepository.findAll({
        sort: iFindAllCommentDto.sort,
      });
    } else {
      comments = await this.commentRepository.findAll({
        size: iFindAllCommentDto.size,
        sort: iFindAllCommentDto.sort,
        page: iFindAllCommentDto.page,
      });
    }

    return { comments, totalElements };
  }

  /**
   * @function create
   * @description: Create Coment
   * @param ICreateCommentDto: An object of type CreateProductDto containing the Product information.
   * @return Promise<Product>
   */
  public async create(ICreateCommentDto: ICreateCommentDto): Promise<Comment | null> {

    const CreateCommentDto: CreateCommentDto = {
      title: ICreateCommentDto.title,
      content: ICreateCommentDto.content,
      creator: ICreateCommentDto.creator,
      product: ICreateCommentDto.product
    };
     
    let comment = await this.commentRepository.create(CreateCommentDto);

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
