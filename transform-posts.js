const fs = require("fs");

const posts = fs.readdirSync(`${__dirname}/posts`);

posts.forEach((path) => {
  const fullPath = `${__dirname}/posts/${path}`;
  const [year, month, day, ...slug] = path.split("-");

  const lastWord = slug.slice(-1)[0].split(".")[0]; // remove .html.md

  const newDirName = [...slug.slice(0, -1), lastWord].join("-");

  const newDirPath = `${__dirname}/posts/${newDirName}`;

  const content = fs.readFileSync(fullPath, "utf-8").split("\n");
  content.splice(1, 0, `published: "${year}-${month}-${day}"`);
  // console.log(content.slice(0, 5));

  fs.mkdirSync(newDirPath);

  // fs.copyFileSync(fullPath, `${newDirPath}/index.md`);
  fs.writeFileSync(`${newDirPath}/index.md`, content.join("\n"));
});
