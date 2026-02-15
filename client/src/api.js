export async function submitSurvey(data) {
  const response = await fetch("http://localhost:5000/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit survey");
  }

  return response.json();
}

/*
export async function submitSurvey(answers) {
  const res = await fetch("http://localhost:5000/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });

  return res.json();
}
*/