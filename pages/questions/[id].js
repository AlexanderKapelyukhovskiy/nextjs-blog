import Layout from "../../components/layout";
import Head from "next/head";
import { getAllQuestionIds, getQuestionData } from "../../lib/questions";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
  const paths = getAllQuestionIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const questionData = await getQuestionData(params.id);
  return {
    props: {
      questionData,
    },
  };
}

export default function Post({ questionData }) {
  return (
    <Layout back="questions">
      <Head>
        <title>{questionData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{questionData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={questionData.date} />
        </div>
        {questionData.questions.map(
          ({ question, questionId, answers, correctAnswerId }) => (
            <div key={questionId}>
              {question}
              {answers.map(({ answerId, answer }) => (
                <div key={answerId}>
                  <button
                    onClick={() => {
                      console.log(answerId + " " + correctAnswerId);
                      alert(answerId === correctAnswerId ? "ДА!" : "НЕТ :(");
                    }}
                  >
                    {answer}
                  </button>
                </div>
              ))}
            </div>
          )
        )}
      </article>
    </Layout>
  );
}
