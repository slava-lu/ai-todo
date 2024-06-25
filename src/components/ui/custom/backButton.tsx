"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Button
      onClick={handleBackClick}
      variant="outline"
      className="flex items-center space-x-2 w-24"
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </Button>
  );
};

export default BackButton;
