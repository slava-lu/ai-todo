"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchBar() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="search">{t("todo#search_label")}</Label>
      <Input
        defaultValue={searchParams.get("query") || ""}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        type="text"
        id="search"
        placeholder={t("todo#search_placeholder")}
      />
    </div>
  );
}
