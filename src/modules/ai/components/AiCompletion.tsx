"use client";

import { streamTextAction } from "@/modules/todo/todo-actions";
import { useState, useEffect } from "react";
import { readStreamableValue } from "ai/rsc";
import { useFormStatus } from "react-dom";

export default function AiCompletion() {
  const [text, setText] = useState("");
  const { pending, data } = useFormStatus();
  useEffect(() => {
    console.log("data", data?.get("description"));
    console.log("pending", pending);

    const generateCompletion = async (prompt: string) => {
      const result = await streamTextAction(prompt);
      for await (const text of readStreamableValue(result)) setText(text ?? "");
    };
    pending && data && generateCompletion(data?.get("description") as string);
  }, [pending]);

  return (
    <div>
      <div>Ai answers: {text}</div>
    </div>
  );
}
