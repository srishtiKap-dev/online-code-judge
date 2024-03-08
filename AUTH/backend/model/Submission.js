const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  testCaseId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    enum: ["Passed", "Failed"],
    required: true
  }
});

module.exports = mongoose.model("submission", submissionSchema);
