import React, { useState } from "react";
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

export default function Questions({ questionData }) {
  const [questions, setQuestions] = useState({ ...questionData });

  function findFirst(elements, condition) {
    const element = elements.find(condition);
    return element ? [element] : [];
  }

  function onSelect(question, answerId) {
    const q = questions.questions.map((q) => {
      return q.questionId === question.questionId ? { ...q, answerId } : q;
    });
    const finished = !q.find((qq) => !qq.answerId);
    const correctAnswers = q.filter((q) => q.answerId === q.correctAnswerId)
      .length;

    setQuestions({
      ...questions,
      questions: q,
      finished,
      correctAnswers,
    });
  }

  return (
    <Layout back="questions">
      <Head>
        <title>{questions.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{questions.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={questions.date} />
        </div>
        {!questions.finished &&
          findFirst(questions.questions, (q) => !q.answerId).map((q) => (
            //({ question, questionId, answers, correctAnswerId }) => (
            <div key={q.questionId}>
              {q.question}
              {q.answers.map(({ answerId, answer }) => (
                <div key={answerId}>
                  <button
                    onClick={() => {
                      onSelect(q, answerId);
                      //console.log(answerId + " " + correctAnswerId);
                      //alert(answerId === correctAnswerId ? "ДА!" : "НЕТ :(");
                    }}
                  >
                    {answer}
                  </button>
                </div>
              ))}
            </div>
          ))}
        {questions.finished && (
          <div>
            <p>Congrats!</p>
            <p>
              Your score is: {questions.correctAnswers} /{" "}
              {questions.questions.length}
            </p>
          </div>
        )}
      </article>
    </Layout>
  );
}
