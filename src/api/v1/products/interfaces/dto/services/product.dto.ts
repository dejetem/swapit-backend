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
  files: [String];
  likeCount: [string];
  comments: [string];
}

export interface ICreateProductDto {
  brandName: string;
  description: string;
  tags: [string];
  files?: any;
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
  files?: String;
  comments?: [string];
  likeCount?: [string]
}
