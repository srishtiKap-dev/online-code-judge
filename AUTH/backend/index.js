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
const { generateFile } = require("./compiler/generateFile.js");
const { generateInputFile } = require("./compiler/generateInputFile.js");
const { executeCpp } = require("./compiler/executeCpp.js");
const { executeJava } = require("./compiler/executeJava.js");
const { executePy } = require("./compiler/executePy.js");
const { v4: uuid } = require("uuid"); // using v4 & alias name as uuid
const Submission = require("./model/Submission.js");

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
      httpOnly: false // only manipulate by server & not manipulate by client/frontend
    };

    // send the token
    res.status(200).cookie("userId", token, options).json({
      message: "You have successfully logged In!",
      success: true,
      token,
      isAdmin: user.isAdmin
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
    var orderByParam = { title: 1 };
    const questionList = await Question.find({}).sort(orderByParam);
    res
      .status(200)
      .json({ message: "Fetched the questions successfully!", questionList });
  } catch (error) {
    console.log("Error:" + error.message);
    return res.status(500).json({ message: error.message });
  }
});

// get a particular question based on title
app.get("/question/description/:title", async (req, res) => {
  try {
    var title = req.params.title;
    const questionDesc = await Question.find({ title });
    res
      .status(200)
      .json({ message: "Fetched the description successfully!", questionDesc });
  } catch (error) {
    console.log("Error:" + error.message);
    return res.status(500).json({ message: error.message });
  }
});

// run/compile code
app.post("/run", async (req, res) => {
  const { language, code } = req.body;
  var input = req.body.input;
  if (!input) {
    input = "";
  }
  if (!language) {
    return res.status(400).json({ message: "Please select language!" });
  }
  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code body" });
  }

  try {
    const randomUniqueId = uuid();
    const filePath = await generateFile(language, code, randomUniqueId);
    const inputPath = await generateInputFile(input, randomUniqueId);
    var output = "";
    switch (language) {
      case "cpp":
        output = await executeCpp(filePath, inputPath);
        break;
      case "java":
        output = await executeJava(filePath, inputPath);
        break;
      case "py":
        output = await executePy(filePath, inputPath);
        break;
    }

    res.json({ filePath, output, inputPath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// submit code
app.post("/submit", async (req, res) => {
  try {
    const { title, language, code, token } = req.body;

    if (!language) {
      return res.status(400).json({ message: "Please select language!" });
    }
    if (!code) {
      return res.status(400).json({ success: false, error: "Empty code body" });
    }

    //Get testcase array from DB based on problem title
    var testCase = await TestCase.find().populate({
      path: "problemId",
      match: { title: title }
    });

    // shift : gets the object of 1st array
    testCase = testCase.filter(z => z.problemId != null).shift();
    var testCaseInput = testCase.input;
    var testCaseOutput = testCase.output;

    const randomUniqueId = uuid();

    //Create code file in codes folder
    const filePath = await generateFile(language, code, randomUniqueId);

    //Create testcase input file in input folder
    const inputPath = await generateInputFile(testCaseInput, randomUniqueId);

    //Run code and return output
    var userOutput = "";
    switch (language) {
      case "cpp":
        userOutput = await executeCpp(filePath, inputPath);
        break;
      case "java":
        userOutput = await executeJava(filePath, inputPath);
        break;
      case "py":
        userOutput = await executePy(filePath, inputPath);
        break;
    }

    //Match db output with output from above step
    var output = "";
    userOutput = userOutput.trim();
    var isSuccess = false;
    if (userOutput === testCaseOutput) {
      isSuccess = true;
      output = "Code Submitted successfully.";
    } else {
      output = "Code Submission failed due to wrong answer.";
    }

    // save submitted data in DB
    var problemId = testCase.problemId._id;
    var testCaseId = testCase._id;
    var userData = jwt.verify(token, process.env.SECRET_KEY);
    var userId = userData.id;
    const timeStamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Calcutta"
    });
    var languageSelected =
      language == "cpp" ? "C++" : language == "java" ? "Java" : "Python";

    console.log(language);
    var status = isSuccess ? "Passed" : "Failed";
    await Submission.create({
      problemId,
      testCaseId,
      userId,
      language: languageSelected,
      code,
      timeStamp,
      status
    });

    res.json({ output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get submission History
app.get("/submissionHistory", async (req, res) => {
  try {
    var submissionHistory = await Submission.find(
      {},
      { _id: 0, testCaseId: 0, code: 0 },
      { sort: { submittedAt: -1 } }
    )

      .populate({
        path: "problemId"
      })
      .populate({
        path: "userId"
      });

    res.status(200).json({
      message: "Fetched the submission history successfully!",
      submissionHistory
    });
  } catch (error) {
    console.log("Error:" + error.message);
    return res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
