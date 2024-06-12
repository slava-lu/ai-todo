import OpenAI from "openai";

export default async function AiTest() {
  const openai = new OpenAI();
  const openAiApiKey = process.env.OPENAI_API_KEY;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0,
    max_tokens: 250,
    messages: [
      {
        role: "system",
        content:
          "You're a helpful assistant providing the accurate and concise answers",
      },
      { role: "user", content: "What is the distance till the sun in km" },
    ],
  });
  console.log("response", response.choices[0]);
  const message = response.choices[0].message.content;
  return (
    <div>
      <div>Ai answers: {message}</div>
    </div>
  );
}
