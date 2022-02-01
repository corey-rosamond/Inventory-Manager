import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let products;

/**
 * Products Data Access Object
 */
export default class ProductsDAO
{
    /**
     * Inject Db
     * @param conn
     * @returns {Promise<void>}
     */
    static async injectDb(conn)
    {
        if(products)
        {
            return;
        }
        try
        {
            products = await conn.db(process.env.PRODUCTS_NS).collection("Products");
        }
        catch(e)
        {
            console.error(
                `Unable to establish a collection handle in productsDAO: ${e}`
            );
        }
    }

    /**
     * Get Products
     * @param filters
     * @param page
     * @param productsPerPage
     * @returns {Promise<{totalNumProducts: *, productList: *}|{totalNumProducts: number, productList: *[]}>}
     */
    static async getProducts(
        {
            filters = null,
            page = 0,
            productsPerPage = 20
        } = {})
    {
        let query;
        // Filter code should go here
        if(filters)
        {
            if("name" in filters)
            {
                query = { $text: { $search: filters["name"] } }
            }
        }

        let cursor;

        try
        {
            cursor = await products.find(query);
        } catch(e)
        {
            console.error(`Unable to issue find command: ${e}`);
            return {
                productList: [],
                totalNumProducts: 0
            };
        }

        // Get only the records for the page we requested.
        const displayCursor = cursor.limit(productsPerPage).skip(productsPerPage * page);

        try
        {
            const productList = await displayCursor.toArray();
            const totalNumProducts = await products.countDocuments(query);
            return {
                productList: productList,
                totalNumProducts: totalNumProducts
            };
        } catch(e)
        {
            console.error(
                `Unable to convert cursor to array or problem counting documents: ${e}`
            );
            return {
                productList: [],
                totalNumProducts: 0
            };
        }
    }

    /**
     * Add Product
     * @param name
     * @param description
     * @param purchase_price
     * @param our_price
     * @param retail_price
     * @param quantity
     * @param retail_link
     * @returns {Promise<{error}|*>}
     */
    static async addProduct(name, description, purchase_price, our_price, retail_price, quantity, retail_link)
    {
        try
        {
            const productDocument = {
                name: name,
                description: description,
                purchase_price: purchase_price,
                our_price: our_price,
                retail_price: retail_price,
                quantity: quantity,
                retail_link: retail_link
            };
            // Push the document into the database
            return await products.insertOne(productDocument);
        } catch(e)
        {
            console.error(`Unable to add product ${e}`);
            return {
                error: e
            };
        }
    }

    /**
     * Update Product
     * @param id
     * @param name
     * @param description
     * @param purchase_price
     * @param our_price
     * @param retail_price
     * @param quantity
     * @param retail_link
     * @returns {Promise<{error}|*>}
     */
    static async updateProduct(id, name, description, purchase_price, our_price, retail_price, quantity, retail_link)
    {
        try
        {
            const updateResponse = await products.updateOne(
                { _id: ObjectId(id) },
                {
                    $set: {
                        name: name,
                        description: description,
                        purchase_price: purchase_price,
                        our_price: our_price,
                        retail_price: retail_price,
                        quantity: quantity,
                        retail_link: retail_link
                    }
                }
            );
            return updateResponse;
        } catch(e)
        {
            console.error(`unable to update product: ${e}`);
            return {
                error: e
            };
        }
    }

    /**
     * Delete Product
     * @param id
     * @returns {Promise<void>}
     */
    static async deleteProduct(id)
    {
        try
        {
            const deleteResponse = await products.deleteOne({
               _id: ObjectId(id)
            });
            return deleteResponse;
        } catch(e)
        {
            console.error(`Unable to delete product ${e}`)
        }
    }
}