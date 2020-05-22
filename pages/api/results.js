import { insertAnswer } from "../../lib/questionDb";

export default async (req, res) => {
  console.log(req.body);
  let result = await insertAnswer(req.body);
  res.status(201).json(result);
};
