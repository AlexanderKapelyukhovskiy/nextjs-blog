import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import AnswersComponent from "../components/answers";

function Answers({ answers }) {
  return (
    <Layout hideHeader>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Answers</h2>
        <ul className={utilStyles.list}>
          {answers &&
            answers.map(
              ({
                id,
                title,
                studentName,
                correctAnswers,
                finishedAt,
                questions,
              }) => (
                <li className={utilStyles.listItem} key={id}>
                  <hr />
                  <div>
                    studentName: <strong>{studentName}</strong>
                  </div>
                  <div>title: {title}</div>
                  <div>finishedAt: {finishedAt}</div>
                  <div>
                    correctAnswers: <strong>{correctAnswers}</strong>
                  </div>
                  {questions && (
                    <AnswersComponent
                      questions={{ questions: questions }}
                      hideTitle
                    />
                  )}
                </li>
              )
            )}
        </ul>
      </section>
    </Layout>
  );
}

Answers.getInitialProps = (ctx) => {
  const promise = fetch("/api/results")
    .then((a) => {
      return a.json();
    })
    .then((json) => {
      return { answers: json };
    });
  return promise;
};

export default Answers;
