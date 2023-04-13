import { Response, Request, NextFunction, Router } from "express";

import { ProductValidationMessage } from "../validations/product.validations";

import CommentManagementController from "../controllers/comment.controller";

import { body } from "express-validator";

export default function CommentRoutes(
  commentManagementController: CommentManagementController
) {
  const router = Router();

  /**
   * @swagger
   * tags:
   *   name: Comment Management
   */

  /**
   * @swagger
   * /api/v1/managements/comment:
   *   get:
   *     security:
   *      - bearerAuth: []
   *     summary: Get list of Comment for a Product.
   *     tags: [Comment Management]
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
   *         description: Comments successfully found.
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
   *                        Comment:
   *                           $ref: '#/components/schemas/Comment'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: Comment successfully found.
   *       401:
   *         description: Unaithorized.
   *       500:
   *         description: Erreur serveur
   */
  router.get("/", (req: Request, res: Response, next: NextFunction) =>
    commentManagementController.findAll(req, res, next)
  );

  /**
   * @swagger
   * /api/v1/managements/comment/{id}:
   *   get:
   *     security:
   *       - bearerAuth: []
   *     summary: Get one Comment by id.
   *     tags: [Comment Management]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           required: true
   *     responses:
   *       200:
   *         description: Comment successfully found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      Comment:
   *                        $ref: '#/components/schemas/Comment'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: Comment successfully found.
   *       401:
   *         description: Unthorized
   *       404:
   *         description: Comment not found.
   *       500:
   *         description: Erreur server
   */
  router.get("/:id", (req: Request, res: Response, next: NextFunction) =>
    commentManagementController.findOne(req, res, next)
  );

  /**
   * @swagger
   * /api/v1/managements/comment:
   *   post:
   *     security:
   *       - bearerAuth: []
   *     summary: Create a prouduct
   *     tags: [Comment Management]
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              title:
   *                type: string
   *                required: true
   *                example: apple watch ultra
   *              content:
   *                type: string
   *                required: true
   *                example: lorem ipsum dolor sit amet
   *              creator:
   *                type: string
   *                required: true
   *                example: 64300352bb22bbc7eb418e8c
   *              product:
   *                type: string
   *                required: true
   *                example: 6430416607fc0995e82d3f1d
   *     responses:
   *       201:
   *         description: Comment successufully created.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      Comment:
   *                        $ref: '#/components/schemas/Comment'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: Comment successufully created.
   *       422:
   *         description: Erreur de validation
   *       500:
   *         description: Erreur serveur
   */
  router.post(
    "/",
    [
      body(["title", "content", "creator", "product"])
        .not()
        .isEmpty()
        .withMessage({
          message: ProductValidationMessage.FIELD_REQUIRED,
          errorCode: 0,
        }),
    ],
    (req: Request, res: Response, next: NextFunction) =>
      commentManagementController.create(req, res, next)
  );


  /**
   * @swagger
   * /api/v1/managements/comment/{id}:
   *   delete:
   *     summary: Delete a Comment.
   *     tags: [Comment Management]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           required: true
   *     responses:
   *       200:
   *         description: Comment successfully delete
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 Comment:
   *                   $ref: '#/components/schemas/Comment'
   *       403:
   *         description: Vous n'ête pas autorisé à effectuer cette action
   *       404:
   *         description: Permission introuvable
   *       500:
   *         description: Erreur serveur
   */
  router.delete("/:id", (req: Request, res: Response, next: NextFunction) =>
    commentManagementController.delete(req, res, next)
  );

  return router;
}
