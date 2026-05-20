import { useGithubSearch } from "@/features/search/hooks/useGithubSearch";
import { useSearch } from "@/features/search/hooks/useSearch";

export function SearchView() {
  useGithubSearch();
  const { status, results } = useSearch();

  console.log("[SearchView]", { status, results });

  return null;
}
