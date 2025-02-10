"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Dynamic state for search fields
  const [searchValues, setSearchValues] = useState({
    query: searchParams.get("query") || "",
    category: searchParams.get("category") || "",
  });

  const updateParams = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    // Update params based on non-empty search values
    Object.entries(searchValues).forEach(([key, value]) => {
      if (value.trim() !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router, searchValues]);

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(updateParams, 500);
    return () => clearTimeout(timeoutId);
  }, [searchValues, updateParams]);

  // Generic handler for updating search values
  const handleInputChange = (key: string, value: string) => {
    setSearchValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <Input
        placeholder="Search..."
        name="query"
        type="text"
        value={searchValues.query}
        onChange={(e) => handleInputChange("query", e.target.value)}
      />
    </div>
  );
}
