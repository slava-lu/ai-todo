"use client";

import { streamTextAction } from "@/modules/todo/todo-ai-action";
import { useState, useEffect } from "react";
import { readStreamableValue } from "ai/rsc";

export default function AiCompletion() {
  const [text, setText] = useState("");
  useEffect(() => {
    const generateCompletion = async () => {
      const result = await streamTextAction();
      for await (const delta of readStreamableValue(result))
        setText(delta ?? "");
    };
    generateCompletion();
  }, []);

  return (
    <div>
      <div>Ai answers: {text}</div>
    </div>
  );
}
