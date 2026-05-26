const fs = require("fs");
const path = require("path");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir("./app", (filePath) => {
  if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
    let content = fs.readFileSync(filePath, "utf8");
    const original = content;

    // Fix button type
    content = content.replace(/<button(\s|\n)/g, '<button type="button"$1');
    content = content.replace(
      /type="button"(.*?)type="submit"/gs,
      'type="submit"$1',
    );
    content = content.replace(
      /type="submit"(.*?)type="button"/gs,
      'type="submit"$1',
    );

    // Remove duplicates if any
    content = content.replace(
      /type="button"([\s\S]*?)type="button"/g,
      'type="button"$1',
    );

    if (content !== original) {
      fs.writeFileSync(filePath, content);
    }
  }
});

walkDir("./features", (filePath) => {
  if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
    let content = fs.readFileSync(filePath, "utf8");
    const original = content;

    // Fix button type
    content = content.replace(/<button(\s|\n)/g, '<button type="button"$1');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
    }
  }
});

console.log("Fixed basic buttons");
