import { Router } from "express";

import UserRoutes from "../api/v1/users/routes/user.routes";

import UserManagementController from "../api/v1/users/controllers/user.controller";

import UserService from "../api/v1/users/services/user.service";

import UserRepository from "../api/v1/users/repositories/user.repository";

import ProductRoutes from "../api/v1/products/routes/product.routes";

import ProductManagementController from "../api/v1/products/controllers/product.controller";

import ProductService from "../api/v1/products/services/product.service";

import ProductRepository from "../api/v1/products/repositories/product.repository";


/**
 * @description Router configuration
 * @exports router
 * @default
 */
export default function AllRoutes() {
  const router: Router = Router();

  router.use(
    "/v1/managements/user",
    UserRoutes(
      new UserManagementController(
        new UserService(new UserRepository())
      )
    )
  );

  router.use(
    "/v1/managements/product",
    ProductRoutes(
      new ProductManagementController(
        new ProductService(new ProductRepository())
      )
    )
  );

  return router;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - propertyValue
 *         - mortgageValance
 *         - utilityOfFunding
 *         - userInformation
 *       properties:
 *         id:
 *           type: string
 *         propertyValue:
 *           type: number
 *         mortgageValance:
 *           type: number
 *         utilityOfFunding:
 *           type: string
 *         userInformation:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             phoneNumber:
 *               type: string
 *             courielAddress:
 *               type: string
 *     Product:
 *       type: object
 *       required:
 *         - propertyValue
 *         - mortgageValance
 *         - utilityOfFunding
 *         - userInformation
 *       properties:
 *         id:
 *           type: string
 *         propertyValue:
 *           type: number
 *         mortgageValance:
 *           type: number
 *         utilityOfFunding:
 *           type: string
 *         userInformation:
 *           type: object
 *           properties:
 *             brandName:
 *               type: string
 *             description:
 *               type: string
 *             tags:
 *               type: [string]
 *             selectedFile:
 *               type: string
 *             likeCount:
 *                type: [string]
 *             comments:
 *                 type: [string]
 *             creator:
 *                 type: string
 *             name:
 *                 type: string
 *        
 */
