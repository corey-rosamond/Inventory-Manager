import CategoryModal from "../model/CategoryModal.js";
import ErrorResponse from "../utils/ErrorResponse.js";

/**
 * CategoryController
 */
export default class CategoryController
{
  /**
   * Get By ID
   * @param request
   * @param response
   * @param next
   * @returns {Promise<*>}
   */
  static async getById(request, response, next)
  {
    try
    {
      let id = request.params.id;
      let category = await CategoryModal.findById(id);
      if(category.length === 0)
      {
        return next(new ErrorResponse(
          "Resource not found!",
          400
        ));
      }
      return response
        .status(201)
        .json({
          success:true,
          category: category
        });
    } catch (error)
    {
      return next(error);
    }
  }

  /**
   * Get By URI
   * @param request
   * @param response
   * @param next
   * @returns {Promise<*>}
   */
  static async getByUri(request, response, next)
  {
    try
    {
      let uri = request.params.uri;
      let category = await CategoryModal.find(
        {uri: uri}
      );
      if(category.length === 0)
      {
        return next(new ErrorResponse(
          "Resource not found!",
          400
        ));
      }
      return response
        .status(201)
        .json({
          success: true,
          category: category
        });
    } catch (error)
    {
      return next(error);
    }
  }

  /**
   * Get All
   *
   * This is for getting many records
   * @todo add filters and limits.
   * @param request
   * @param response
   * @param next
   * @returns {Promise<*>}
   */
  static async getAll(request, response, next)
  {
    try
    {
      let categories = await CategoryModal.find(
        {published: true},
        null,
        {limit: 4}
      );
      return response
        .status(201)
        .json({
          success: true,
          categories: categories
        })
    } catch (error)
    {
      return next(error);
    }
  }

  /**
   * Add
   *
   * This is a basic category add function.
   * @param request
   * @param response
   * @param next
   * @returns {Promise<*>}
   */
  static async add(request, response, next)
  {
    try
    {
      let {
        title,
        description,
        color,
        image
      } = request.body;
      let uri = (title.toLowerCase()).split(' ').join('_');
      let category = await CategoryModal.create({
        title,
        description,
        color,
        uri,
        image
      });
      return response
        .status(201)
        .json({
          success: true,
          category: category
        });
    } catch(error)
    {
      return next(error);
    }
  }

  /**
   * update
   * @param request
   * @param response
   * @param next
   * @returns {Promise<*>}
   * @todo Complete this method.
   */
  static async update(request, response, next)
  {
    try
    {
      let id = request.params.id;
      return next(new ErrorResponse(
        "Not yet supported",
        501
      ));
    } catch (error)
    {
      return next(error);
    }
  }

  /**
   * delete
   * @param request
   * @param response
   * @param next
   * @returns {Promise<*>}
   * @todo Complete this method.
   */
  static async delete(request, response, next)
  {
    try
    {
      let id = request.params.id;
      return next(new ErrorResponse(
        "Not yet supported",
        501
      ));
    } catch (error)
    {
      return next(error);
    }
  }
};