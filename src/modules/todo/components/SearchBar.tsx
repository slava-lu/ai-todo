"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
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
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="w-[350px]  mr-1">
      <Input
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        type="text"
        id="search"
        placeholder={t("todo#search_placeholder")}
        style={{ minWidth: "180px" }}
      />
    </div>
  );
}
