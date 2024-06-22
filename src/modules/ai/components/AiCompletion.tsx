"use client";

import { streamTextAction, updateTodoAiRec } from "@/modules/todo/todo-actions";
import { useState, useEffect } from "react";
import { readStreamableValue } from "ai/rsc";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

export default function AiCompletion() {
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

  return (
    <div className="mt-10">
      <div className="mb-6">{t("todo#ai_recommendation_title")}</div>
      <div>{completion}</div>
    </div>
  );
}
