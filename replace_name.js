const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (
      file.endsWith(".ts") ||
      file.endsWith(".tsx") ||
      file.endsWith(".json") ||
      file.endsWith(".css")
    ) {
      results.push(file);
    }
  });
  return results;
}

const files = walk("./src");
files.push("./vite.config.ts");

let count = 0;
files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  const newContent = content
    // Replace OrigoHOSTs with OrigoHOST, but avoid breaking github.com/origohosts if it's supposed to be lowercase.
    // However, the user said "make the name OrigoHOST", so we'll replace "OrigoHOSTs" (case-sensitive) with "OrigoHOST".
    .replace(/OrigoHOSTs/g, "OrigoHOST");
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, "utf8");
    count++;
  }
});
console.log(`Updated ${count} files.`);
