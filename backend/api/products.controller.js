import ProductsDAO from "../dao/productsDAO.js";

export default class ProductsController
{
    static async apiGetProducts(req, res, next)
    {
        const productsPerPage = req.query.productsPerPage ? parseInt(req.query.productsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};
        // Filter code goes here
        if(req.query.name)
        {
            filters.name = req.query.name;
        }

        const {
            productList,
            totalNumProducts
        } = await ProductsDAO.getProducts({
            filters,
            page,
            productsPerPage
        });

        let response = {
            products: productList,
            page: page,
            filters: filters,
            entries_per_page: productsPerPage,
            total_results: totalNumProducts
        }

        res.json(response);
    }

    static async apiAddProduct(req, res, next)
    {}

    static async apiUpdateProduct(req, res, next)
    {}

    static async apiDeleteProduct(req, res, next)
    {}
}