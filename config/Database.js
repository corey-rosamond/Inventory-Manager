import mongoose from "mongoose";

/**
 * Database
 *
 * Default Mongoose database object
 */
class Database
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

// Export the database object.
export default Database;