import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ChangeStatusButton({ status }: { status: number }) {
  const t = useTranslations();
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      variant="default"
      className={cn("w-20 md:w-32", { "bg-gray-500": status === 1 })}
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {status === 1 ? t("todo#undo_action") : t("todo#do_action")}
    </Button>
  );
}
