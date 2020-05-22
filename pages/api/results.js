import { insertAnswer, getAnswers } from "../../lib/questionDb";

export default async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    try {
      let result = await insertAnswer(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    try {
      var answers = await getAnswers();
      res.status(200).json([...answers]);
    } catch (error) {
      res.status(400).send(JSON.stringify(error) + error.stack);
    }
  }
};
