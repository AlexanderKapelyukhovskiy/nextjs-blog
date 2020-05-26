import React from "react";

export default function Email({ questions, hideTitle }) {
  return (
    <div>
      {!hideTitle && <h2>{questions.title}</h2>}
      <ul>
        {questions.questions.map((q) => (
          <li
            key={q.questionId}
            style={{
              color: q.correct ? "green" : "red",
            }}
          >
            {q.question}{" "}
            {!q.correct
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
