const fs = require("fs");
const path = require("path");
const outputDirectory = path.join(__dirname, "outputs");
const { exec } = require("node:child_process");

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}
const executeJava = async (filePath, inputPath) => {
  const mainClassName = "HelloWorld";
  return new Promise((resolve, reject) => {
    exec(
      `javac ${filePath} -d ${outputDirectory} && cd ${outputDirectory} && java ${mainClassName} < ${inputPath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};

module.exports = { executeJava };
