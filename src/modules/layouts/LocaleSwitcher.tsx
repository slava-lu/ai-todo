"use client";

import { useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";
import { usePathname } from "@/lib/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locales } from "@/lib/consts";

export default function LocaleSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handleChange = (event: string) => {
    startTransition(() => {
      console.log("event", event);
      console.log("pathname", pathname);
      replace(`/${event}/${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="mr-4">
      <Select
        defaultValue={locale}
        onValueChange={handleChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {t(`general#${locale}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
