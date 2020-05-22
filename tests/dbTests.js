import { getAnswer, insertAnswer } from "../lib/questionDb";
import question from "../questions/i-know-color-of-your-eyes";

async function test() {
  const url = process.env.MONGO_URL;
  let res = await insertAnswer(url, question);
  console.log(res);

  res = await getAnswer(url);
  console.log(res);
}

test();
