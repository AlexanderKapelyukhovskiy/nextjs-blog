import { insertAnswer, getAnswers } from "../../lib/questionDb";

export default async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    let result = await insertAnswer(req.body);
    res.status(201).json(result);
  } else {
    var answers = await getAnswers();
    res.status(200).json([...answers]);
  }
};
