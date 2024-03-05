const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "question"
  },
  input: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("testcase", testCaseSchema);
