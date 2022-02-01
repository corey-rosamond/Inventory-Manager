import express from "express";
import cors from "cors";
import products from "./api/products.route.js";


const app = express();

app.use(cors());
app.use(express.json());


// Handle inventory api calls
app.use("/api/v1/products", products);

// Catch 404 Errors
app.use('*', (req, res) => {
    res.status(404).json({
        error: "not found"
    });
});

export default app;