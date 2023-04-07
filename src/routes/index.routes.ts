import { Router } from "express";

import UserRoutes from "../api/v1/users/routes/user.routes";
import AuthRoutes from "../api/v1/auth/routes/auth.routes";

import UserManagementController from "../api/v1/users/controllers/user.controller";
import AuthController from "../api/v1/auth/controllers/auth.controller";

import UserService from "../api/v1/users/services/user.service";
import AuthService from "../api/v1/auth/services/auth.service";

import UserRepository from "../api/v1/users/repositories/user.repository";


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
 */
