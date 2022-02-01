import express from "express";
import ProductsController from "./products.controller.js";

const router = express.Router();

/** Default route returns all products. */
router.route("/").get(ProductsController.apiGetProducts);

/** This route supports getting a product by its ID */
router.route("/id/:id").get(ProductsController.apiGetProductById);

/**  product sub route supports post, put and delete. */
router
    .route("/product")
    .post(ProductsController.apiAddProduct)
    .put(ProductsController.apiUpdateProduct)
    .delete(ProductsController.apiDeleteProduct);

export default router;