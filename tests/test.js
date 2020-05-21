import {
  getQuestions,
  getAllQuestionIds,
  getQuestionData,
} from "../lib/questions";

console.warn("!!!!!!!!!getQuestions!!!!!!!!!!!!");
console.log(getQuestions());
console.warn("!!!!!!!!!getAllQuestionIds!!!!!!!!!!!!");
console.log(getAllQuestionIds());
console.warn("!!!!!!!!!getQuestionData!!!!!!!!!!!!");
console.log(getQuestionData("i-know-your-birthday"));
