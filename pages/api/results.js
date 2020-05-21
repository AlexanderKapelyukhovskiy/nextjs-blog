import nodemailer from "nodemailer";
import { renderToString } from "react-dom/server";
import Email from "../../components/email";

async function sendAnswers(answers) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  const testAccount = {
    user: "vvo2vzhjculnl2rn@ethereal.email",
    pass: "XPajFrPFRZRR1X3TwE",
  };

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "test.nextjs.01", //testAccount.user, // generated ethereal user
      pass: "Qwerty!23456", //testAccount.pass, // generated ethereal password
    },
  });

  const answersHTML = renderToString(<Email questions={answers} />);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    //from: '"Fred Foo 👻" <foo@example.com>', // sender address
    from: `"${answers.studentName}" <${testAccount.user}>`,
    to: "alkapa2005@gmail.com", // list of receivers
    subject: `Answers from ${answers.studentName}✔`, // Subject line
    text: `Answers from ${answers.studentName}!\n${JSON.stringify(answers)}`, // plain text body
    html: `<b>Answers from ${answers.studentName}!</b><div>${answersHTML}</div>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export default (req, res) => {
  console.log(req.body);
  sendAnswers(req.body).catch((e) => console.error(e));

  res.status(200).json({ text: "well done!" });
};
