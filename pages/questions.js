import React from "react";
import Head from "next/head";

import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getQuestions } from "../lib/questions";
import { saveQuestion } from "../lib/questionDb";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allQuestions = getQuestions();

  allQuestions.forEach(async (q) => saveQuestion(q));

  return {
    props: {
      allQuestions,
    },
  };
}

export default function Questions({ allQuestions }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Questions</h2>
        <ul className={utilStyles.list}>
          {allQuestions.map(({ id, title, date }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/questions/[id]" as={`/questions/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
