"use server";

import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";

export const streamTextAction = async () => {
  const result = await streamText({
    model: openai("gpt-4o"),
    temperature: 0,
    maxTokens: 250,
    system: "You are a helpful assistant.",
    prompt:
      "What is the capital of France and what the main 3 attractions there are?. Generate maximus 3 sentences ",
  });
  return createStreamableValue(result.textStream).value;
};
