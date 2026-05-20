import { reducer, initialState } from "./reducer";
import type { GitHubUser } from "./types";

const user: GitHubUser = {
  id: 1,
  login: "torvalds",
  avatar_url: "",
  html_url: "",
};

describe("reducer", () => {
  it("has correct initial state", () => {
    expect(initialState).toEqual({
      query: "",
      status: "idle",
      results: [],
      error: null,
    });
  });

  describe("SET_QUERY", () => {
    it("sets query and resets state", () => {
      const state = {
        ...initialState,
        status: "success" as const,
        results: [user],
        error: "x",
      };
      expect(
        reducer(state, { type: "SET_QUERY", payload: "torvalds" }),
      ).toEqual({
        query: "torvalds",
        status: "idle",
        results: [],
        error: null,
      });
    });
  });

  describe("FETCH_START", () => {
    it("sets status to loading", () => {
      expect(reducer(initialState, { type: "FETCH_START" }).status).toBe(
        "loading",
      );
    });
  });

  describe("FETCH_SUCCESS", () => {
    it("sets status to success with results", () => {
      const next = reducer(initialState, {
        type: "FETCH_SUCCESS",
        payload: [user],
      });
      expect(next.status).toBe("success");
      expect(next.results).toEqual([user]);
    });

    it("sets status to empty when payload is empty", () => {
      const next = reducer(initialState, {
        type: "FETCH_SUCCESS",
        payload: [],
      });
      expect(next.status).toBe("empty");
      expect(next.results).toEqual([]);
    });
  });

  describe("FETCH_ERROR", () => {
    it("sets status to error with message", () => {
      const next = reducer(initialState, {
        type: "FETCH_ERROR",
        payload: "Network error",
      });
      expect(next.status).toBe("error");
      expect(next.error).toBe("Network error");
    });
  });

  describe("FETCH_RATE_LIMITED", () => {
    it("sets status to rate-limited", () => {
      expect(reducer(initialState, { type: "FETCH_RATE_LIMITED" }).status).toBe(
        "rate-limited",
      );
    });
  });
});
