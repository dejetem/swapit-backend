import { UserInformation } from "../../../../../../interfaces/models/user-information.interface copy";

export interface CreateProductDto {
  brandName: string;
  description: string;
  tags: [string];
  files?: [String];
  creator: string;
  name: string;
}

export interface UpdateProductDto {
  id: string;
  brandName: string;
  description: string;
  tags?: [string];
  files?: String;
  creator: string;
  name: string;
  comments?: [string];
  likeCount?: [string]
}
export interface CreateCommentDto {
  description: string;
  creator: string;
  name: string;
  product: string
}

