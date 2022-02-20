import express from "express";
import CategoryController from "../controller/CategoryController.js";
const router = express.Router();

/**
 * The add route is missing a security check. This is fine in development but once we move to live this will
 * need to be fixed
 *
 * @todo add security check
 */
router.route('/add')
  .post(CategoryController.add);

/**
 * Update a category record
 *
 * @todo add security check
 */
router.route('/update/:id')
  .put(CategoryController.update);

/**
 * Delete method
 *
 * @todo add security check
 */
router.route('/delete/:id')
  .delete(CategoryController.delete);

/**
 * Get a single category from its id
 */
router.route('/getById/:id')
  .get(CategoryController.getById);

/**
 * Get a single category using its uri.
 */
router.route('/getByUri/:uri')
  .get(CategoryController.getByUri)

/**
 * Get all will need some work to be used in multiple instances.
 * the first use of it will be the homepage.
 */
router.route("/getAll")
  .get(CategoryController.getAll);

export default router;