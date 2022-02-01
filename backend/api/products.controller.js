import ProductsDAO from "../dao/productsDAO.js";

/**
 * Product Controller
 */
export default class ProductsController
{
    /**
     * API Get Products
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
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

    /**
     * API Add Product
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    static async apiAddProduct(req, res, next)
    {
        try
        {
            const name = req.body.name;
            const description = req.body.description;
            const purchase_price = req.body.purchase_price;
            const our_price = req.body.our_price;
            const retail_price = req.body.retail_price;
            const quantity = req.body.quantity;
            const retail_link = req.body.retail_link;

            const addProductResponse = await ProductsDAO.addProduct(
                name,
                description,
                purchase_price,
                our_price,
                retail_price,
                quantity,
                retail_link
            );

            res.json({ status: "success" })
        } catch (e)
        {
            res.status(500)
                .json({error: e.message});
        }
    }

    /**
     * API Update Product
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    static async apiUpdateProduct(req, res, next)
    {
        try
        {
            const productId = req.body.id;
            const name = req.body.name;
            const description = req.body.description;
            const our_price = req.body.our_price;
            const retail_price = req.body.retail_price;
            const quantity = req.body.quantity;
            const retail_link = req.body.retail_link;

            const updateResponse = await ProductsDAO.updateProduct(
                productId,
                name,
                description,
                our_price,
                retail_price,
                quantity,
                retail_link
            );

            let { error } = updateResponse;

            if(error)
            {
                res.status(400).json({error});
            }

            if(updateResponse.modifiedCount === 0)
            {
                throw new Error("Unable to update product!");
            }

            res.json({ status: "success" });
        } catch(e)
        {
            res.status(500)
                .json({error: e.message});
        }
    }

    /**
     * API Delete Product
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    static async apiDeleteProduct(req, res, next)
    {
        try
        {
            const productId = req.query.id;
            const deleteResponse = await ProductsDAO.deleteProduct(productId);
            res.json({status: "success"});
        } catch (e)
        {
            res.status(500)
                .json({error: e.message});
        }
    }
}