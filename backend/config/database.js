import mongoose from "mongoose";

/**
 * Database
 *
 * Default Mongoose database object
 */
class database
{
    /**
     * connect
     *
     * Connect to the mongo db.
     * @returns {Promise<void>}
     */
    static async connect()
    {
        await mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 50,
                wtimeoutMS: 2500
            }
        );

        console.log("MongoDB Connected");
    }
}

export default database;