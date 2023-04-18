import { Response, Request, NextFunction, Router } from "express";

import { ProductValidationMessage } from "../validations/product.validations";

import ProductManagementController from "../controllers/product.controller";

import { body } from "express-validator";
import { extname, join } from "path";
import multer from "multer";

const uploadPath = join(process.cwd(), "upload", "images");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (
      ["image/jpeg", "image/png", "image/jpg", "image/jpeg"].includes(
        file.mimetype
      )
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export default function ProductRoutes(
  productManagementController: ProductManagementController
) {
  const router = Router();

  /**
   * @swagger
   * tags:
   *   name: Product Management
   */

  /**
   * @swagger
   * /api/v1/managements/product:
   *   get:
   *     security:
   *      - bearerAuth: []
   *     summary: Get list of products.
   *     tags: [Product Management]
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
   *         description: Product successfully found.
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
   *                        Product:
   *                           $ref: '#/components/schemas/Product'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: Product successfully found.
   *       401:
   *         description: Unaithorized.
   *       500:
   *         description: Erreur serveur
   */
  router.get("/", (req: Request, res: Response, next: NextFunction) =>
    productManagementController.findAll(req, res, next)
  );

  /**
   * @swagger
   * /api/v1/managements/product/{id}:
   *   get:
   *     security:
   *       - bearerAuth: []
   *     summary: Get one Product by id.
   *     tags: [Product Management]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           required: true
   *     responses:
   *       200:
   *         description: Product successfully found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      Product:
   *                        $ref: '#/components/schemas/Product'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: Product successfully found.
   *       401:
   *         description: Unthorized
   *       404:
   *         description: Product not found.
   *       500:
   *         description: Erreur server
   */
  router.get("/:id", (req: Request, res: Response, next: NextFunction) =>
    productManagementController.findOne(req, res, next)
  );

  /**
   * @swagger
   * /api/v1/managements/product:
   *   post:
   *     security:
   *       - bearerAuth: []
   *     summary: Create a prouduct
   *     tags: [Product Management]
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              brandName:
   *                type: string
   *                required: true
   *                example: apple watch ultra
   *              description:
   *                type: string
   *                required: true
   *                example: lorem ipsum dolor sit amet
   *              tags:
   *                type: string
   *                required: true
   *                example: items.
   *              files:
   *                type: string
   *                required: true
   *                example: lorem
   *              name:
   *                type: string
   *                required: true
   *                example: "Doe"
   *     responses:
   *       201:
   *         description: product successufully created.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      Product:
   *                        $ref: '#/components/schemas/Product'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: Product successufully created.
   *       422:
   *         description: Erreur de validation
   *       500:
   *         description: Erreur serveur
   */
  router.post(
    "/",
    upload.array("files", 10),
    [
      body(["brandName", "description", "tags"])
        .not()
        .isEmpty()
        .withMessage({
          message: ProductValidationMessage.FIELD_REQUIRED,
          errorCode: 0,
        }),
    ],
    (req: Request, res: Response, next: NextFunction) =>
      productManagementController.create(req, res, next)
  );

  /**
   * @swagger
   * /api/v1/managements/product/{id}:
   *   put:
   *     security:
   *       - bearerAuth: []
   *     summary: Edit a proudct.
   *     tags: [Product Management]
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
   *              brandName:
   *                type: string
   *                required: true
   *                example: apple watch ultra
   *              description:
   *                type: string
   *                required: true
   *                example: lorem ipsum dolor sit amet
   *              tags:
   *                type: string
   *                required: true
   *                example: items.
   *              selectedFile:
   *                type: string
   *                required: true
   *                example: lorem
   *              name:
   *                type: string
   *                required: true
   *                example: "Doe"
   *     responses:
   *       201:
   *         description: Product information successfully updated.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      Product:
   *                        $ref: '#/components/schemas/Product'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: Prouduct information successfully updated.
   *       404:
   *         description: product not found.
   *       422:
   *         description: Erreur de validation
   *       500:
   *         description: erreur serveur
   */
  router.put(
    "/:id",
    [
      body([" brandName", "description", "selectedFile", "tags"])
        .not()
        .isEmpty()
        .withMessage({
          message: ProductValidationMessage.FIELD_REQUIRED,
          errorCode: 0,
        }),
    ],
    (req: Request, res: Response, next: NextFunction) =>
      productManagementController.update(req, res, next)
  );

  /**
   * @swagger
   * /api/v1/managements/product/{id}:
   *   delete:
   *     summary: Delete a product.
   *     tags: [Product Management]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           required: true
   *     responses:
   *       200:
   *         description: Product successfully delete
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 Product:
   *                   $ref: '#/components/schemas/Product'
   *       403:
   *         description: Vous n'ête pas autorisé à effectuer cette action
   *       404:
   *         description: Permission introuvable
   *       500:
   *         description: Erreur serveur
   */
  router.delete("/:id", (req: Request, res: Response, next: NextFunction) =>
    productManagementController.delete(req, res, next)
  );

  return router;
}
