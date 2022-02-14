import ProductsModel from "../model/products.model.js";
import ErrorResponse from "../utils/error.response.js";

/**
 * Product Controller
 */
export default class ProductsController
{
  /**
   * API Get Products
   * @param request
   * @param response
   * @param next
   * @returns {Promise<void>}
   */
  static async apiGetProducts(request, response, next)
  {
    try
    {
      let products = await ProductsModel.find(
        {published: true},
        null,
        {limit: 50}
      );
      return products;
    } catch (error)
    {
      next(error);
    }
  }

  /**
   * API Get Product by ID
   * @param request
   * @param response
   * @param next
   * @returns {Promise<void>}
   */
  static async apiGetProductById(request, response, next)
  {

  }

  /**
   * API Add Product
   * @param request
   * @param response
   * @param next
   * @returns {Promise<void>}
   */
  static async apiAddProduct(request, response, next)
  {
    try
    {
      let {
        name,
        description,
        purchased_at,
        sell_at,
        selling_at,
        retail_link,
        stock_quantity,
        photo_1,
        photo_2,
        photo_3,
        photo_4,
        photo_5,
        photo_6
      } = request.body;
      let product = await ProductsModel.create({
        name,
        description,
        purchased_at,
        sell_at,
        selling_at,
        retail_link,
        stock_quantity,
        photo_1,
        photo_2,
        photo_3,
        photo_4,
        photo_5,
        photo_6
      });
      return response
        .status(201)
        .json({
          success: true,
          data: "Product Added"
        })
    } catch (error)
    {
        next(error);
    }
  }

  /**
   * API Update Product
   * @param request
   * @param response
   * @param next
   * @returns {Promise<void>}
   */
  static async apiUpdateProduct(request, response, next)
  {

  }

  /**
   * API Delete Product
   * @param request
   * @param response
   * @param next
   * @returns {Promise<void>}
   */
  static async apiDeleteProduct(request, response, next)
  {

  }
}