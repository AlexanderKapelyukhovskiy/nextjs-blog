import { insertAnswer, getAnswers, getQuestion } from "../../lib/questionDb";

export default async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    try {
      const answer = req.body;
      const questionData = await getQuestion(answer.id);

      console.log(questionData.questions);

      answer.questions.forEach((q) => {
        q.correctAnswerId = questionData.questions.find(
          (qq) => qq.questionId === q.questionId
        ).correctAnswerId;
      });

      const result = await insertAnswer(answer);

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
