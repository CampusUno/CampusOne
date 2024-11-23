import express from "express";

import authRoutes from "./routes/auth.routes.js"; //Add the extension when importing local files
//What is the authRoutes? authRoutes is an alias to the Router defined in auth.routes.js, meaning instead of calling it router we will call it authRoutes to be more specific and avoid any confusion.

const app = express();

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
    console.log("Server is running on port 8000!");
});
