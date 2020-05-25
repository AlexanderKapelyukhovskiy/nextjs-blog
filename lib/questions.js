import fs from "fs";
import path from "path";

const questionsDirectory = path.join(process.cwd(), "questions");

export function getQuestions() {
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

export function getAllQuestionIds() {
  const fileNames = fs.readdirSync(questionsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.js$/, ""),
      },
    };
  });
}

export function getQuestionDataTest() {
  return questionsDirectory;
}

export function getQuestionData(questionId) {
  const fileNames = fs.readdirSync(questionsDirectory);

  const question = fileNames
    .filter((fileName) => fileName === `${questionId}.js`)
    .map((fileName) => {
      const v = require(`../questions/${fileName}`).default;
      v.id = fileName.replace(".js", "");
      return v;
    });

  console.log(question);

  return question[0];
}
