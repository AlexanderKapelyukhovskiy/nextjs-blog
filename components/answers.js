import React from "react";

export default function Email({ questions, hideTitle }) {
  console.log(questions);
  return (
    <div>
      {!hideTitle && <h2>{questions.title}</h2>}
      <ul>
        {questions.questions.map((q) => (
          <li
            key={q.questionId}
            style={{
              color: q.answerId === q.correctAnswerId ? "green" : "red",
            }}
          >
            {q.question}{" "}
            {q.answerId !== q.correctAnswerId
              ? "✘ " +
                q.answers.find((a) => a.answerId === q.answerId).answer +
                "???"
              : "✔"}
          </li>
        ))}
      </ul>
    </div>
  );
}
