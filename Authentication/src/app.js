const cookieParser = require("cookie-parser");
const AuthRoutes = require("./routes/auth.routes");

const express = require("express");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/auth", AuthRoutes);

module.exports = app;
