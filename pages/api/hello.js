import { getQuestionDataTest } from "../../lib/questions";

export default (req, res) => {
  try {
    res.status(200).json(getQuestionDataTest("i-know-your-birthday"));
  } catch (error) {
    res.status(400).json(error.stack);
  }
};
