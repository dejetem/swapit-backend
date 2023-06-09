import { Router } from "express";

import UserRoutes from "../api/v1/users/routes/user.routes";
import AuthRoutes from "../api/v1/auth/routes/auth.routes";

import UserManagementController from "../api/v1/users/controllers/user.controller";
import AuthController from "../api/v1/auth/controllers/auth.controller";

import UserService from "../api/v1/users/services/user.service";
import AuthService from "../api/v1/auth/services/auth.service";
import CommentService from "../api/v1/comment/services/comment.service";

import UserRepository from "../api/v1/users/repositories/user.repository";
import CommentRepository from "../api/v1/comment/repositories/comment.repository";

import ProductRoutes from "../api/v1/products/routes/product.routes";
import CommentRoutes from "../api/v1/comment/routes/comment.routes";

import ProductManagementController from "../api/v1/products/controllers/product.controller";
import CommentManagementController from "../api/v1/comment/controllers/comment.controller";

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
    "/v1/auth",
    AuthRoutes(
      new AuthController(
        new AuthService(new UserService(new UserRepository()))
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

  router.use(
    "/v1/managements/comment",
    CommentRoutes(
      new CommentManagementController(
        new CommentService(new CommentRepository())
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
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - phoneNumber
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: number
 *         lastName:
 *           type: number
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phoneNumber:
 *           type: string
 * 
 *     Product:
 *       type: object
 *       required:
 *         - brandName
 *         - description
 *         - tags
 *         - creator
 *         - name
 *       properties:
 *         id:
 *           type: string
 *         brandName:
 *           type: string
 *         description:
 *           type: string
 *         tags:
 *           type: [string]
 *         creator:
 *           type: string
 *         name:
 *           type: string
 * 
 *     Comment:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - creator
 *         - product
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         creator:
 *           type: string
 *         product:
 *           type: string       
 */
