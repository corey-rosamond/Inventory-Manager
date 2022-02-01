import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let products;

export default class ProductsDAO
{
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
}