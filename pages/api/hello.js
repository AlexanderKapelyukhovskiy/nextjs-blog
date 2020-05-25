import { getQuestionData } from "../../lib/questions";

export default (req, res) => {
  try {
    res.status(200).json(getQuestionData("i-know-your-birthday1"));
  } catch (error) {
    res.status(400).json(error.stack);
  }
};
