import fs from "fs";
import path from "path";

const questionsDirectory = path.join(process.cwd(), "questions");

function getQuestions() {
  const fileNames = fs.readdirSync(questionsDirectory);

  const allQuestions = fileNames.map((fileName) => {
    const v = require(`../questions/${fileName}`).default;
    v.id = fileName.replace(".js", "");
    console.log(v);
    return v;
  });

  return allQuestions.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export { getQuestions };
