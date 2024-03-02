const fs = require("fs");
const path = require("path");
const outputDirectory = path.join(__dirname, "outputs");
const { exec } = require("node:child_process");

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}
const executePy = async (filePath, inputPath) => {
  return new Promise((resolve, reject) => {
    exec(`python3 ${filePath} < ${inputPath}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

module.exports = { executePy };
