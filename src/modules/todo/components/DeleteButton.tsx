import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

export default function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant="outline" size="icon">
      {!pending && <Trash2 className=" h-4 w-4" />}
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
    </Button>
  );
}
