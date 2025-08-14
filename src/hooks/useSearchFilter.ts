import { useState, useMemo } from "react";

export default function useSearchFilter<T extends { name?: string; tags?: string[] }>(data: T[]) {
  const [searchInput, setSearchInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        !searchInput ||
        (item.name && item.name.toLowerCase().includes(searchInput.toLowerCase()));

      const matchesCategory =
        !categoryInput ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase() === categoryInput.toLowerCase()));

      return matchesSearch && matchesCategory;
    });
  }, [data, searchInput, categoryInput]);

  return { filteredData, searchInput, setSearchInput, categoryInput, setCategoryInput };
}