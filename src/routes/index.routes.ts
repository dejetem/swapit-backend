import { Router } from "express";

import UserRoutes from "../api/v1/users/routes/user.routes";

import UserManagementController from "../api/v1/users/controllers/user.controller";

import UserService from "../api/v1/users/services/user.service";

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
 */
