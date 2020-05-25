import { getQuestionData } from "../../lib/questions";

export default (req, res) => {
  res.status(200).json(getQuestionData("i-know-your-birthday"));
};
