"use client";

import ReactMarkdown from "react-markdown";
import { streamTextAction, updateTodoAiRec } from "@/modules/todo/todo-actions";
import { useState, useEffect, useRef } from "react";
import { readStreamableValue } from "ai/rsc";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

export default function AiCompletion() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [completion, setCompletion] = useState("");
  const { pending, data } = useFormStatus();

  const t = useTranslations();
  useEffect(() => {
    const generateCompletion = async (prompt: string) => {
      const result = await streamTextAction(prompt);
      let text: string | undefined;
      for await (text of readStreamableValue(result)) {
        setCompletion(text ?? "");
      }
      await updateTodoAiRec(text ?? "");
    };
    pending && data && generateCompletion(data?.get("description") as string);
  }, [pending]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [completion]);

  return (
    <div className="mt-10">
      {!completion && (
        <div className="mb-6 italic">{t("todo#ai_recommendation_title")}</div>
      )}
      <div ref={messagesEndRef}>
        <ReactMarkdown>{completion}</ReactMarkdown>
      </div>
    </div>
  );
}
