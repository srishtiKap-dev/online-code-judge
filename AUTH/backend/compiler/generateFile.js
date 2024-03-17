const fs = require("fs");
const path = require("path");

//Algo-online-judge/AUTH/backend/compiler/codes : create codes directory
const codeDirectory = path.join(__dirname, "codes");
if (!fs.existsSync(codeDirectory)) {
  fs.mkdirSync(codeDirectory, { recursive: true });
}

// create cpp directory
const cppDirectory = path.join(__dirname, "codes", "cpp");
if (!fs.existsSync(cppDirectory)) {
  fs.mkdirSync(cppDirectory, { recursive: true });
}

// create java directory
const javaDirectory = path.join(__dirname, "codes", "java");
if (!fs.existsSync(javaDirectory)) {
  fs.mkdirSync(javaDirectory, { recursive: true });
}

// create py directory
const pyDirectory = path.join(__dirname, "codes", "py");
if (!fs.existsSync(pyDirectory)) {
  fs.mkdirSync(pyDirectory, { recursive: true });
}

const generateFile = async (fileExtension, code, randomUniqueId) => {
  const fileName = randomUniqueId + "." + fileExtension;
  var filePath = "";
  switch (fileExtension) {
    case "cpp":
      filePath = path.join(cppDirectory, fileName);
      break;
    case "java":
      filePath = path.join(javaDirectory, fileName);
      break;
    case "py":
      filePath = path.join(pyDirectory, fileName);
      break;
  }

  await fs.writeFileSync(filePath, code);
  return filePath;
};
module.exports = { generateFile };
