import express from "express";
import ProductsController from "./products.controller.js";

const router = express.Router();


router.route("/").get(ProductsController.apiGetProducts);

router
    .route("/product")
    .post(ProductsController.apiAddProduct)
    .put(ProductsController.apiUpdateProduct)
    .delete(ProductsController.apiDeleteProduct);

export default router;