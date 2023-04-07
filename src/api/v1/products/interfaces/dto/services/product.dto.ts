import { FindAllDto } from "../../../../../../interfaces/models/query.interface";
import { UserInformation } from "../../../../../../interfaces/models/user-information.interface copy";

export interface IFindAllProductDto extends FindAllDto {}

export interface IFindProductDto {
  id: string;
  brandName: string;
  description: string;
  creator: string;
  name: string;
  tags: [string];
  selectedFile: String;
  likeCount: [string];
  comments: [string];
}

export interface ICreateProductDto {
  brandName: string;
  description: string;
  tags: [string];
  selectedFile?: String;
  creator: string;
  name: string;
}

export interface IUpdateProductDto {
  id: string;
  brandName: string;
  description: string;
  creator: string;
  name: string;
  tags?: [string];
  selectedFile?: String;
  comments?: [string];
  likeCount?: [string]
}

export interface ICreateCommentDto {
  description: string;
  creator: string;
  name: string;
  product: string
}




