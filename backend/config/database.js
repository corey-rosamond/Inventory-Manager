import mongoose from "mongoose";

export default class database
{

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