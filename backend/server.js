import express from "express";
import cors from "cors";
import users_router from "./api/users.route.js";
import products_router from "./api/products.route.js";

const app = express();

app.use(cors());
app.use(express.json());

// Handle users route api calls
app.use("/api/v1/users", users_router);

// Handle product route api calls
app.use("/api/v1/products", products_router);

// Catch 404 Errors
app.use('*', (req, res) => {
    res.status(404).json({
        error: "not found"
    });
});

export default app;