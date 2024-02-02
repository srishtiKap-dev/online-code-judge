const express = require("express");
const app = express();
const { DBConnection } = require("./database/db");
const { config } = require("dotenv");
require("dotenv").config();
const PORT = process.env.PORT || config.env.PORT;
const User = require("./model/User");
const bcrypt = require("bcryptjs");

DBConnection();
app.get("/", (req, res) => {
  res.send("Welcome");
});

// register API
app.post("/register", async (req, res) => {
  try {
    // get all data from frontend
    const { firstname, lastname, username, password } = req.body;

    // validate ALL the data should exists
    if (!firstname && !lastname && !username && !password) {
      return res.status(400).send("Please enter all the required details");
    }

    // validate if user already exists or not
    const doesUserExists = await User.findOne({ username });
    if (doesUserExists) {
      return res.status(200).send(`User ${username} already exists`);
    }
    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // save data in DB
    const userData = await User.create({
      firstname,
      lastname,
      username,
      hashedPassword
    });

    // generate a JWT token for user & send
    const token = jwt.sign(
      { id: userData._id, username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    userData.password = undefined;
    res
      .status(200)
      .json({ message: "You have successfully reistered!", userData });
  } catch (error) {
    console.log("Error:" + error.message);
  }
});

// login API
app.post("/login", (req, res) => {
  res.send("Login Page");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
