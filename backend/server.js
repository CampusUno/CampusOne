import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"; //Add the extension when importing local files
//What is the authRoutes? authRoutes is an alias to the Router defined in auth.routes.js, meaning instead of calling it router we will call it authRoutes to be more specific and avoid any confusion.
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; //If undefined gives 5000 by default

app.use(express.json()); // to parse req.body || Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // to parse form data (urlencoded) - as seen in Postman

// Method to test by logging any route that is hit
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Ensure next() is called
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
    connectMongoDB();
});
