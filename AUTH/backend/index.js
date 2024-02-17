const express = require("express");
const app = express();
const { DBConnection } = require("./database/db");
const { config } = require("dotenv");
require("dotenv").config();
const PORT = process.env.PORT || config.env.PORT;
const User = require("./model/User.js");
const Question = require("./model/Question.js");
const TestCase = require("./model/TestCase.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//middleware to allow nodejs to read data from frontend
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DBConnection();
app.get("/", (req, res) => {
  res.send("Welcome");
});

// register API
app.post("/register", async (req, res) => {
  try {
    // get all data from frontend
    const { firstname, lastname, email, password } = req.body;

    // validate ALL the data should exists
    if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter all the required details" });
    }

    // validate if user already exists or not
    const doesUserExists = await User.findOne({ email });
    if (doesUserExists) {
      return res.status(400).json({ message: `User ${email} already exists` });
    }
    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // save data in DB
    const userData = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      isAdmin: false
    });

    // generate a JWT token for user & send
    const token = jwt.sign(
      { id: userData._id, email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    userData.password = undefined;
    res
      .status(200)
      .json({ message: "You have successfully registered!", userData });
  } catch (error) {
    console.log("Error:" + error.message);
  }
});

// login API
app.post("/login", async (req, res) => {
  try {
    // get all the user data
    const { email, password } = req.body;

    // check if all data is provided by user
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter all the required details" });
    }

    // check if user exists in DB or not
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: `User ${email} does not exists. Please register` });
    }

    // match the password
    const enteredPassword = await bcrypt.compare(password, user.password);
    if (!enteredPassword) {
      return res.status(400).json({ message: "Incorrect Password." });
    }

    // create jwt token
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h"
    });
    user.token = token;
    user.password = undefined;

    // store cookies to the browser
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true // only manipulate by server & not manipulate by client/frontend
    };

    // send the token
    res.status(200).cookie("token", token, options).json({
      message: "You have successfully logged In!",
      success: true,
      token // optional
    });
  } catch (error) {
    console.log("Error:" + error.message);
  }
});

// create question API
app.post("/questions", async (req, res) => {
  try {
    // get all data from frontend
    const { title, description, type, difficulty, input, output } = req.body;

    // check all data should be entered
    if (!title || !description || !type || !difficulty || !input || !output) {
      return res.status(400).send("Please enter all the required details");
    }

    // save data in DB
    const questionData = await Question.create({
      title,
      description,
      type,
      difficulty
    });

    const testcaseData = await TestCase.create({
      problemId: questionData._id,
      input,
      output
    });

    // return response
    res.status(200).json({
      message: "New Question is created!",
      questionData,
      testcaseData
    });
  } catch (error) {
    console.log("Error:" + error.message);
  }
});

// get list of questions
app.get("/questions", async (req, res) => {
  try {
    const questionList = await Question.find({});
    res
      .status(200)
      .json({ message: "Fetched the questions successfully!", questionList });
  } catch (error) {
    console.log("Error:" + error.message);
    return res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
