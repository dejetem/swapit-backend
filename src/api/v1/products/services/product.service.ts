import createHttpError from "http-errors";

import ProductRepository from "../repositories/product.repository";


import {
  IFindAllProductDto,
  ICreateProductDto,
  IUpdateProductDto,
} from "../interfaces/dto/services/product.dto";
import {
  CreateProductDto,
  UpdateProductDto,
} from "../interfaces/dto/repositories/product.dto";
import { Product } from "../interfaces/product.model";

import { ProductValidationMessage } from "../validations/product.validations";

export default class ProductService {
  constructor(private productRepository: ProductRepository) {}

  /**
   * @function findAll
   * @description: Get Product list
   * @param IFindAllProductDto: list sort by asc, number of page and document size
   * @return Promise<{ product: Product[]; totalElements: number }>
   */
  public async findAll(IFindAllProductDto: IFindAllProductDto): Promise<{
    product: Product[];
    totalElements: number;
  }> {
    let product: Product[] = [];

    let totalElements = await this.productRepository.countAll();

    if (IFindAllProductDto.size === -1) {
      product = await this.productRepository.findAll({ sort: IFindAllProductDto.sort });
    } else {
      product= await this.productRepository.findAll({
        sort: IFindAllProductDto.sort,
        page: IFindAllProductDto.page,
        size: IFindAllProductDto.size,
      });
    }

    return { product, totalElements };
  }

  /**
   * @function findOne
   * @description: Get a product by id
   * @param id: The product id.
   * @return Promise<Product>
   */
  public async findOne(id: string): Promise<Product> {
    let product = await this.productRepository.findById(id);

    if (!product) {
      throw new createHttpError.NotFound(ProductValidationMessage.NOT_FOUND);
    }

    return product;
  }

  /**
   * @function create
   * @description: Create Product
   * @param ICreateProductDto: An object of type CreateProductDto containing the Product information.
   * @return Promise<Product>
   */
  public async create(ICreateProductDto: ICreateProductDto): Promise<Product> {


    const CreateProductDto: CreateProductDto = {
      brandName: ICreateProductDto.brandName,
      description: ICreateProductDto.description,
      tags: ICreateProductDto.tags,
      selectedFile: ICreateProductDto.selectedFile,
      creator: ICreateProductDto.creator,
      name: ICreateProductDto.name
    };

    let product = await this.productRepository.create(CreateProductDto);

    return product;
  }

  /**
   * @function update
   * @description: Update Product
   * @param IUpdateProductDto: An object of type IUpdateProductDto containing the Product information
   * @return Promise<Product>
   */
  public async update(IUpdateProductDto: IUpdateProductDto): Promise<Product> {
    let product: any = await this.findOne(IUpdateProductDto.id);

    let likeCountNumber: any = null;
    if(!product){
      throw new createHttpError.NotFound(ProductValidationMessage.NOT_FOUND);
    }else{
      likeCountNumber = product.likeCount += 1;
    }

    const UpdateProductDto: UpdateProductDto = {
      id: IUpdateProductDto.id,
      brandName: IUpdateProductDto.brandName,
      description: IUpdateProductDto.description,
      tags: IUpdateProductDto.tags,
      selectedFile: IUpdateProductDto.selectedFile,
      creator: IUpdateProductDto.creator,
      name: IUpdateProductDto.name,
      comments: IUpdateProductDto.comments,
      likeCount: likeCountNumber
    };

    product = await this.productRepository.update(UpdateProductDto);
    return product;
  }


  /**
   * @function delete
   * @description Function that delete a Product
   * @param id The Product id
   * @return Promise<void>
   */
  public async delete(id: string): Promise<void> {
    let product = await this.productRepository.delete(id);

    if (!product) {
      throw new createHttpError.NotFound(ProductValidationMessage.NOT_FOUND);
    }

    return;
  }
}
