import dotenv from "dotenv";
dotenv.config({path: ".env"});
import express from "express";
import cors from "cors";
import users_router from "./route/users.route.js";
import products_router from "./route/products.route.js";
import database from "./config/database.js";
import ErrorHandler from './middleware/error.handler.js'

database.connect();
const app = express();

app.use(cors());
app.use(express.json());

// Handle users route controller calls
app.use("/controller/v1/users", users_router);

// Handle product route controller calls
app.use("/controller/v1/products", products_router);

// Catch 404 Errors
app.use('*', (req, res) => {
    res.status(404).json({
        error: "not found"
    });
});

// Error handler must be last.
app.use(ErrorHandler.do);

const PORT = process.env.PORT || 500;

const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(process.exit(1));
});

export default app;