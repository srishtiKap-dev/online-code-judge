const fs = require("fs");
const path = require("path");
const outputDirectory = path.join(__dirname, "outputs");
const { exec } = require("node:child_process");

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}
const executePy = async filePath => {
  const randomUniqueString = path.basename(filePath).split(".")[0];
  const outFile = randomUniqueString + ".class";
  const outputPath = path.join(outputDirectory, outFile);

  return new Promise((resolve, reject) => {
    exec(`Python3 ${filePath}`, (error, stdout, stderr) => {
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
