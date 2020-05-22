import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { getAnswers } from "../../lib/questionDb";
import AnswersComponent from "../../components/answers";

export async function getStaticProps() {
  const answers = (await getAnswers()).map((a) => ({ ...a, _id: 0 }));
  return {
    props: {
      answers,
    },
  };
}

export default function Answers({ answers }) {
  return (
    <Layout hideHeader>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Answers</h2>
        <ul className={utilStyles.list}>
          {answers.map(
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
                <AnswersComponent
                  questions={{ questions: questions }}
                  hideTitle
                />
              </li>
            )
          )}
        </ul>
      </section>
    </Layout>
  );
}
