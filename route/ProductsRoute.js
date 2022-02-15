import express from "express";
import ProductsController from "../controller/ProductsController.js";

const router = express.Router();

router.route('/add')
  .post(ProductsController.apiAddProduct);

router.route('/get')
  .get(ProductsController.apiGetProducts);

export default router;