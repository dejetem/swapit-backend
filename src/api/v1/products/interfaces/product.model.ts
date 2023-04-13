export interface Product {
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

export interface Comment {
  id: string;
  description: string;
  creator: string;
  name: string;
  product: string
}
