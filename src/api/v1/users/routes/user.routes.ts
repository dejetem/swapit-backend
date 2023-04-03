import { Response, Request, NextFunction, Router } from "express";

import { UserValidationMessage } from "../validations/user.validations";

import UserManagementController from "../controllers/user.controller";

import { body } from "express-validator";

export default function UserRoutes(
  userManagementController: UserManagementController
) {
  const router = Router();

  /**
   * @swagger
   * tags:
   *   name: User Management
   */

  /**
   * @swagger
   * /api/v1/managements/user:
   *   get:
   *     summary: Recupérer la liste des users.
   *     tags: [User Management]
   *     parameters:
   *       - name: page
   *         in: query
   *         required: false
   *         schema:
   *           type: number
   *       - name: size
   *         in: query
   *         required: false
   *         schema:
   *           type: number
   *       - name: sort
   *         in: query
   *         required: false
   *         schema:
   *           type: string
   *           enum:
   *           - asc
   *           - desc
   *     responses:
   *       200:
   *         description: User successfully found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      perPage:
   *                        type: number
   *                        example: 20
   *                      totalElements:
   *                        type: number
   *                        example: 30
   *                      currentPage:
   *                        type: number
   *                        example: 1
   *                      hasPreviousPage:
   *                        type: boolean
   *                        example: false
   *                      previousPage:
   *                        type: number
   *                        example: 0
   *                      hasNextPage:
   *                        type: boolean
   *                        example: true
   *                      nextPage:
   *                        type: number
   *                        example: 2
   *                      totalPages:
   *                        type: number
   *                        example: 2
   *                      items:
   *                        type: array
   *                        User:
   *                           $ref: '#/components/schemas/User'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: User successfully found.
   *       401:
   *         description: Unaithorized.
   *       500:
   *         description: Erreur serveur
   */
  router.get("/", (req: Request, res: Response, next: NextFunction) =>
    userManagementController.findAll(req, res, next)
  );

  /**
   * @swagger
   * /api/v1/managements/user/{id}:
   *   get:
   *     summary: Recupérer les données d'un utilisateur.
   *     tags: [User Management]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           required: true
   *     responses:
   *       200:
   *         description: User successfully found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      User:
   *                        $ref: '#/components/schemas/User'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: User successfully found.
   *       401:
   *         description: Unthorized
   *       404:
   *         description: User not found.
   *       500:
   *         description: Erreur server
   */
  router.get("/:id", (req: Request, res: Response, next: NextFunction) =>
    userManagementController.findOne(req, res, next)
  );

  /**
   * @swagger
   * /api/v1/managements/user:
   *   post:
   *     summary: Créer un user
   *     tags: [User Management]
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              propertyValue:
   *                type: number
   *                required: true
   *                example: 100000
   *              mortgageValance:
   *                type: number
   *                required: true
   *                example: 1000
   *              utilityOfFunding:
   *                type: string
   *                required: true
   *                example: Payer des cartes de crédit.
   *              firstName:
   *                type: string
   *                required: true
   *                example: "John"
   *              lastName:
   *                type: string
   *                required: true
   *                example: "Doe"
   *              phoneNumber:
   *                type: string
   *                required: true
   *                example: "+12505550199"
   *              courielAddress:
   *                type: string
   *                required: true
   *                example: "jonhdoe@test.com"
   *     responses:
   *       201:
   *         description: user successufully created.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      user:
   *                        $ref: '#/components/schemas/User'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: user successufully created.
   *       422:
   *         description: Erreur de validation
   *       500:
   *         description: Erreur serveur
   */
  router.post(
    "/",
    [
      body([
        "propertyValue",
        "mortgageValance",
        "utilityOfFunding",
        "firstName",
        "lastName",
      ])
        .not()
        .isEmpty()
        .withMessage({
          message: UserValidationMessage.FIELD_REQUIRED,
          errorCode: 0,
        }),
      body("phoneNumber")
        .notEmpty()
        .withMessage({
          message: UserValidationMessage.FIELD_REQUIRED,
          errorCode: 0,
        })
        .isMobilePhone("en-CA")
        .withMessage("Le numéro de téléphone n'est pas valide"),
      body("courielAddress")
        .not()
        .isEmpty()
        .withMessage({
          message: UserValidationMessage.FIELD_REQUIRED,
          errorCode: 0,
        })
        .isEmail()
        .withMessage({
          message: UserValidationMessage.INVALID_EMAIL_ADDRESS,
          errorCode: 8,
        })
        .normalizeEmail({ gmail_remove_dots: false }),
    ],
    (req: Request, res: Response, next: NextFunction) =>
      userManagementController.create(req, res, next)
  );

  /**
   * @swagger
   * /api/v1/managements/user/{id}:
   *   put:
   *     summary: Modifier le nom d'un utilisateur.
   *     tags: [User Management]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         riquired: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *              propertyValue:
   *                type: number
   *                required: true
   *                example: 100000
   *              mortgageValance:
   *                type: number
   *                required: true
   *                example: 1000
   *              utilityOfFunding:
   *                type: string
   *                required: true
   *                example: Payer des cartes de crédit.
   *              firstName:
   *                type: string
   *                required: true
   *                example: "John"
   *              lastName:
   *                type: string
   *                required: true
   *                example: "Doe"
   *              phoneNumber:
   *                type: string
   *                required: true
   *                example: "+12505550199"
   *              courielAddress:
   *                type: string
   *                required: true
   *                example: "jonhdoe@test.com"
   *     responses:
   *       201:
   *         description: User information successfully updated.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      user:
   *                        $ref: '#/components/schemas/User'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: User information successfully updated.
   *       404:
   *         description: user not found.
   *       422:
   *         description: Erreur de validation
   *       500:
   *         description: erreur serveur
   */
  router.put(
    "/:id",
    [
      body([
        "propertyValue",
        "mortgageValance",
        "utilityOfFunding",
        "firstName",
        "lastName",
      ])
        .not()
        .isEmpty()
        .withMessage({
          message: UserValidationMessage.FIELD_REQUIRED,
          errorCode: 0,
        }),
      body("phoneNumber")
        .notEmpty()
        .withMessage({
          message: UserValidationMessage.FIELD_REQUIRED,
          errorCode: 0,
        })
        .isMobilePhone("en-CA")
        .withMessage("Invalid phone number"),
      body("courielAddress")
        .not()
        .isEmpty()
        .withMessage({
          message: UserValidationMessage.FIELD_REQUIRED,
          errorCode: 0,
        })
        .isEmail()
        .withMessage({
          message: UserValidationMessage.INVALID_EMAIL_ADDRESS,
          errorCode: 8,
        })
        .normalizeEmail({ gmail_remove_dots: false }),
    ],
    (req: Request, res: Response, next: NextFunction) =>
      userManagementController.update(req, res, next)
  );

  /**
   * @swagger
   * /api/v1/managements/user/{id}:
   *   delete:
   *     summary: Supprimer un utilisateur.
   *     tags: [User Management]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           required: true
   *     responses:
   *       200:
   *         description: User successfully delete
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       403:
   *         description: Vous n'ête pas autorisé à effectuer cette action
   *       404:
   *         description: Permission introuvable
   *       500:
   *         description: Erreur serveur
   */
  router.delete("/:id", (req: Request, res: Response, next: NextFunction) =>
    userManagementController.delete(req, res, next)
  );

  return router;
}
