import React, { useState } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import { getAllQuestionIds, getQuestionData } from "../../lib/questions";
import DateComponent from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import Answers from "../../components/answers";
import Cookies from "universal-cookie";

export async function getStaticPaths() {
  const paths = getAllQuestionIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const questionData = await getQuestionData(params.id);
  questionData.questions.forEach((q) => {
    q.correctAnswerId = 0;
  });
  console.log(questionData.questions[0]);
  return {
    props: {
      questionData,
    },
  };
}

export default function Questions({ questionData }) {
  const cookies = new Cookies();

  const [studentName, setStudentName] = useState(cookies.get("studentName"));
  const [questions, setQuestions] = useState({ ...questionData, studentName });

  function findFirst(elements, condition) {
    const element = elements.find(condition);
    return element ? [element] : [];
  }

  function onSelect(question, answerId) {
    const q = questions.questions.map((q) => {
      return q.questionId === question.questionId ? { ...q, answerId } : q;
    });
    const finished = !q.find((q) => !q.answerId);

    const newState = {
      ...questions,
      questions: q,
    };

    if (finished) {
      setQuestions({ ...newState, loading: true });
      fetch("/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newState, finishedAt: new Date() }),
      })
        .then((result) => {
          return result.json();
        })
        .then((json) => {
          const correctAnswers = json.questions.filter((q) => q.correct).length;

          setQuestions({ ...json, finished, correctAnswers, loading: false });
        });
    } else {
      setQuestions(newState);
    }
  }

  function onEnterName() {
    if (studentName) {
      cookies.set("studentName", studentName, { path: "/" });
      setQuestions({
        ...questions,
        studentName,
      });
    } else {
      alert("Please provide your name");
    }
  }

  function handleClearStudentName() {
    cookies.remove("studentName", { path: "/" });
    setQuestions({
      ...questions,
      studentName: null,
    });
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
            <h2>
              Hi, {studentName}! (
              <a
                href="javascript:void(0);"
                onClick={() => handleClearStudentName()}
              >
                not {studentName}?
              </a>
              )
            </h2>
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
        {questions.loading && <div>Loading...</div>}
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
