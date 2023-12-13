require("dotenv").config();
const express = require("express");
const bodyParse = require("body-parser");

const app = express();
app.use(bodyParse.json());
const cors = require("cors");
// Middleware to parse JSON request
app.use(express.json());
// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Middleware access allow Domain And Method
app.use(
  cors({
    origin: "*", // Allow requests from this domain
    methods: "GET,PUT,POST,DELETE,PATCH", // Allow these HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    ], // Allow only these headers
  })
);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// auth / login
const authRouter = require("./routes/authRouter");
app.use("/auth", authRouter);
const actionTypeRouter = require("./routes/actionsRouter");
app.use("/type", actionTypeRouter);

const PORT = process.env.PORT || 4000;
const HOST = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server run on port: ${PORT}`);
});
