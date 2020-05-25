import React, { useState } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import { getAllQuestionIds, getQuestionData } from "../../lib/questions";
import DateComponent from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import Answers from "../../components/answers";

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
  const [studentName, setStudentName] = useState("");

  function findFirst(elements, condition) {
    const element = elements.find(condition);
    return element ? [element] : [];
  }

  function onSelect(question, answerId) {
    const q = questions.questions.map((q) => {
      return q.questionId === question.questionId ? { ...q, answerId } : q;
    });
    const finished = !q.find((q) => !q.answerId);
    const correctAnswers = q.filter((q) => q.answerId === q.correctAnswerId)
      .length;

    const newState = {
      ...questions,
      questions: q,
      finished,
      correctAnswers,
    };

    if (finished) {
      fetch("/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newState, finishedAt: new Date() }),
      });
    }

    setQuestions(newState);
  }

  function onEnterName() {
    if (studentName) {
      setQuestions({
        ...questions,
        studentName,
      });
    } else {
      alert("Please provide your name");
    }
  }

  function onStudentNameChange(e) {
    setStudentName(e.target.value);
  }

  return (
    <Layout back="questions" hideHeader>
      <Head>
        <title>{questions.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{questions.title}</h1>
        <div className={utilStyles.lightText}>
          <DateComponent dateString={questions.date} />
        </div>
        {!questions.studentName && (
          <div>
            <h3>Your name please:</h3>
            <input type="text" onChange={onStudentNameChange}></input>
            <button onClick={() => onEnterName()}>submit</button>
          </div>
        )}

        {questions.studentName && !questions.finished && (
          <div>
            <h2>Hi, {studentName}!</h2>
            {findFirst(questions.questions, (q) => !q.answerId).map((q) => (
              <div key={q.questionId}>
                <h2>{q.question}</h2>
                {q.answers.map(({ answerId, answer }) => (
                  <div key={answerId}>
                    <p>
                      <a
                        href="javascript:void(0);"
                        onClick={() => onSelect(q, answerId)}
                      >
                        <h2>{answer}</h2>
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {questions.finished && (
          <div>
            <p>Congrats!</p>
            <p>
              Your score is: {questions.correctAnswers} /{" "}
              {questions.questions.length}
            </p>
            <p>
              <Answers questions={questions} hideTitle />
            </p>
          </div>
        )}
      </article>
    </Layout>
  );
}
