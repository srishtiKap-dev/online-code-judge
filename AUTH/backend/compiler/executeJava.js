const fs = require("fs");
const path = require("path");
const outputDirectory = path.join(__dirname, "outputs");
const { exec } = require("node:child_process");

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}
const executeJava = async filePath => {
  const randomUniqueString = path.basename(filePath).split(".")[0];
  const outFile = randomUniqueString + ".class";
  const outputPath = path.join(outputDirectory, outFile);
  const mainClassName = "Test";

  return new Promise((resolve, reject) => {
    exec(
      `javac ${filePath} -d ${outputDirectory} && cd ${outputDirectory} && java ${mainClassName} && rm ${mainClassName}.class`,
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
