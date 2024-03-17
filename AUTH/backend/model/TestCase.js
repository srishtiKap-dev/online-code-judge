const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "question"
  },
  inputFilePath: {
    type: String,
    required: true
  },
  outputFilePath: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("testcase", testCaseSchema);
