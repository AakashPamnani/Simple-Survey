import { useState } from "react";
import { submitSurvey } from "./api";

function App() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    {
      text: "What would you rather do?",
      optionA: "Hiking a mountain",
      optionB: "Relaxing on the beach",
    },
    {
      text: "What time would you want to wake up?",
      optionA: "6:00 AM to explore",
      optionB: "12:00 PM and relax",
    },
    {
      text: "Where would you rather stay?",
      optionA: "A cabin in the woods",
      optionB: "A luxury beach resort",
    },
    {
      text: "How do you prefer your itinerary?",
      optionA: "Fully planned with activities",
      optionB: "Go with the flow",
    },
    {
      text: "What sounds more fun?",
      optionA: "Trying extreme sports",
      optionB: "Getting a spa treatment",
    },
    {
      text: "What kind of trip excites you most?",
      optionA: "Backpacking through multiple cities",
      optionB: "Staying in one beautiful location",
    },
    {
      text: "What’s your ideal temperature?",
      optionA: "Cool and crisp",
      optionB: "Warm and sunny",
    },
    {
      text: "What activity would you choose?",
      optionA: "Exploring hidden trails",
      optionB: "Watching the sunset with a drink",
    },
    {
      text: "What’s your packing style?",
      optionA: "Light and minimal",
      optionB: "Bring everything just in case",
    },
    {
      text: "What would you rather do at night?",
      optionA: "Go out and explore nightlife",
      optionB: "Stay in and relax",
    },
  ];

  const handleSubmitSurvey = async (e) => {
    e.preventDefault();

    // const res = await submitSurvey(answers);
    const res = await submitSurvey({ name, answers });
    setResult(res);
    setStep(3);
  };

  const allAnswered =
    Object.keys(answers).length === questions.length;

  return (
    <div style={{ padding: "2rem" }}>
      {/* STEP 0 */}
      {step === 0 && (
        <>
          <h1>Welcome to the Travel Survey</h1>
          <p>Answer a few questions and get your result.</p>
          <button onClick={() => setStep(1)}>Next</button>
        </>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <h2>What’s your name?</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br /><br />
          <button disabled={!name} onClick={() => setStep(2)}>
            Next
          </button>
        </>
      )}

      {/* STEP 2 - Dynamic Questions */}
      {step === 2 && (
        <form onSubmit={handleSubmitSurvey}>
          <h2>Survey Questions</h2>

          {questions.map((q, index) => (
            <div key={index} style={{ marginBottom: "1.5rem" }}>
              <p>{q.text}</p>

              <label>
                <input
                  type="radio"
                  name={`q${index}`}
                  value="1"
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [`q${index}`]: Number(e.target.value),
                    })
                  }
                />
                {q.optionA}
              </label>

              <br />

              <label>
                <input
                  type="radio"
                  name={`q${index}`}
                  value="0"
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [`q${index}`]: Number(e.target.value),
                    })
                  }
                />
                {q.optionB}
              </label>
            </div>
          ))}

          <button type="submit" disabled={!allAnswered}>
            Submit
          </button>
        </form>
      )}

      {/* STEP 3 */}
      {step === 3 && result && (
        <>
          <h2>Results</h2>
          <p>Name: {name}</p>
          <p>Score: {result.score}</p>
          <p>Category: {result.classification}</p>
        </>
      )}
    </div>
  );
}

export default App;