const express = require("express");
const app = express();
const { DBConnection } = require("./database/db");
const { config } = require("dotenv");
require("dotenv").config();
const PORT = process.env.PORT || config.env.PORT;

DBConnection();
app.get("/", (req, res) => {
  res.send("Welcome");
});

// register API
app.post("/register", (req, res) => {
  res.send("Register Page");
});

// login API
app.post("/login", (req, res) => {
  res.send("Login Page");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
