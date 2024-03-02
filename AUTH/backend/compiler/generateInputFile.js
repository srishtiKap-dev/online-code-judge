const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid"); // using v4 & alias name as uuid

// create py directory
const inputDirectory = path.join(__dirname, "inputs");

if (!fs.existsSync(inputDirectory)) {
  fs.mkdirSync(inputDirectory, { recursive: true });
}

const generateInputFile = async (input, randomUniqueId) => {
  const fileName = randomUniqueId + ".txt";
  var filePath = path.join(inputDirectory, fileName);
  await fs.writeFileSync(filePath, input);
  return filePath;
};
module.exports = { generateInputFile };
