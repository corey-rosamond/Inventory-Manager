import dotenv from "dotenv";
dotenv.config({path: ".env"});
import express from "express";
import cors from "cors";
import category_router from "./route/CategoryRouter.js";
import users_router from "./route/UsersRoute.js";
import products_router from "./route/ProductsRoute.js";
import Database from "./config/Database.js";
import ErrorHandler from './middleware/ErrorHandler.js';

Database.connect();
const app = express();

app.use(cors());
app.use(express.json());

// Product Category Routes.
app.use("/api/category", category_router);

// Handle users route controller calls
app.use("/api/users", users_router);

// Handle product route controller calls
app.use("/api/products", products_router);

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