import { FindAllDto } from "../../../../../../interfaces/models/query.interface";
import { UserInformation } from "../../../../../../interfaces/models/user-information.interface copy";

export interface IFindAllCommentDto extends FindAllDto {}

export interface IFindCommentDto {
  id: string;
  title: string;
  content: string;
  creator: string;
  Comment: string;
}

export interface IUpdateCommentDto {
  id: string;
  description?: string;
  creator?: string;
  name?: string;
  product?: string;
}

export interface ICreateCommentDto {
  title: string;
  content: string;
  creator: string;
  product: string;
}
