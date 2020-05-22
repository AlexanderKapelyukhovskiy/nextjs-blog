import { getAnswers, insertAnswer } from "../lib/questionDb";
import question from "../questions/i-know-color-of-your-eyes";

async function test() {
  let res = await insertAnswer(question);
  console.log(res);

  res = await getAnswers();
  console.log(res);
}

test();
