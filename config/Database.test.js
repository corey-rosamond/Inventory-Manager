import mongoose from "mongoose";
import {
  MongoMemoryServer
} from "mongodb-memory-server";

// Create a new mongo memory server to use.
const mongod = new MongoMemoryServer();

/**
 * DatabaseTest
 *
 * This is the database test object.
 */
class DatabaseTest
{
  /**
   * connect
   *
   * Create and connect to the test mongo server
   * @returns {Promise<void>}
   */
  static async connect()
  {
    try
    {
      let uri = await mongod.getUri();
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 50,
      });
      console.log("Mongo memory server connected!");
    } catch(error)
    {
      console.log(`Mongo memory server connect failed: ${error.message}`);
    }
  }

  /**
   * disconnect
   *
   * Disconnect from the test db and stop it.
   * @returns {Promise<void>}
   */
  static async disconnect()
  {
    try
    {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongod.stop();
      console.log("mongo memory server disconnect!");
    } catch (error)
    {
      console.log(`Mongo memory server disconnect failed: ${error.message}`);
    }
  }

  /**
   * clear
   *
   * Clear the test db and remove all data.
   * @returns {Promise<void>}
   */
  static async clear()
  {
    try
    {
      let collections = mongoose.connection.collections;
      for (let key in collections) {
        let collection = collections[key];
        await collection.deleteMany();
      }
      console.log("Memory server cleared!");
    } catch (error)
    {
      console.log(`Memory server clear failed: ${error.message}`);
    }
  }
}

// Export the DatabaseTest object.
export default DatabaseTest;