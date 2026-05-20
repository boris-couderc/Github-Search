import { useEffect, useRef } from "react";
import { searchUsers } from "@/features/search/api";
import { useSearchContext } from "@/features/search/context";

const DEBOUNCE_MS = 500;

export function useGithubSearch(): void {
  const { state, dispatch } = useSearchContext();
  const { query } = state;
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!query) return;

    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      dispatch({ type: "FETCH_START" });

      try {
        const results = await searchUsers(query, controller.signal);
        dispatch({ type: "FETCH_SUCCESS", payload: results });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (err instanceof Error && err.message === "rate-limited") {
          dispatch({ type: "FETCH_RATE_LIMITED" });
        } else {
          dispatch({ type: "FETCH_ERROR", payload: "An error occurred" });
        }
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      abortRef.current?.abort();
    };
  }, [query, dispatch]);
}
