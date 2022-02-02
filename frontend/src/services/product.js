import http from "../http-common";

/**
 * Product Data Service
 *
 * This is the service that provides access to the product data.
 */
class ProductDataService
{
    /**
     * Get
     *
     * Gets a single product data from the database.
     * @param id the id of the product in the data base you wish to access.
     * @returns {Promise<AxiosResponse<any>>}
     */
    get(id)
    {
        return http.get(`/id/${id}`);
    }

    /**
     * Get All
     *
     * This will get and return a full list of products data for the selected page.
     * @param page The page id you want to get defaults to 0.
     * @returns {Promise<AxiosResponse<any>>}
     */
    getAll(page = 0)
    {
        return http.get(`?page=${page}`);
    }

    find(by = "name", query, page = 0)
    {
        return http.get(`?${by}=${query}&page=${page}`);
    }

    createProduct(data)
    {

    }

    updateProduct(data)
    {

    }

    deleteProduct(id)
    {

    }
}

export default new ProductDataService();