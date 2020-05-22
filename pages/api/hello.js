export default (req, res) => {
  res.status(200).json({ text: process.env.MONGO_URL });
};
