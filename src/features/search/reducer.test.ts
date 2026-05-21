import { reducer, initialState } from "./reducer";
import type { ResultItem } from "./types";

const item1: ResultItem = {
  id: 1,
  login: "torvalds",
  avatar_url: "",
  html_url: "",
  _key: 100,
};

const item2: ResultItem = {
  id: 2,
  login: "gvanrossum",
  avatar_url: "",
  html_url: "",
  _key: 101,
};

describe("reducer", () => {
  it("has correct initial state", () => {
    expect(initialState).toEqual({
      query: "",
      status: "idle",
      results: [],
      error: null,
      editMode: false,
      selectedIds: [],
      originalResults: null,
    });
  });

  describe("SET_QUERY", () => {
    it("sets query and resets state", () => {
      const state = {
        ...initialState,
        status: "success" as const,
        results: [item1],
        error: "x",
        editMode: true,
        selectedIds: [100],
      };
      expect(
        reducer(state, { type: "SET_QUERY", payload: "torvalds" }),
      ).toEqual({
        query: "torvalds",
        status: "idle",
        results: [],
        error: null,
        editMode: false,
        selectedIds: [],
        originalResults: null,
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
        payload: [{ id: 1, login: "torvalds", avatar_url: "", html_url: "" }],
      });
      expect(next.status).toBe("success");
      expect(next.results).toHaveLength(1);
      expect(next.results[0]).toMatchObject({ id: 1, login: "torvalds" });
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
      expect(
        reducer(initialState, { type: "FETCH_RATE_LIMITED" }).status,
      ).toBe("rate-limited");
    });
  });

  describe("TOGGLE_EDIT_MODE", () => {
    it("enters edit mode and saves originalResults", () => {
      const state = { ...initialState, results: [item1] };
      const next = reducer(state, { type: "TOGGLE_EDIT_MODE" });
      expect(next.editMode).toBe(true);
      expect(next.originalResults).toEqual([item1]);
    });

    it("exits edit mode and restores original results", () => {
      const state = {
        ...initialState,
        editMode: true,
        results: [item2],
        originalResults: [item1],
        selectedIds: [101],
      };
      const next = reducer(state, { type: "TOGGLE_EDIT_MODE" });
      expect(next.editMode).toBe(false);
      expect(next.results).toEqual([item1]);
      expect(next.originalResults).toBeNull();
      expect(next.selectedIds).toEqual([]);
    });
  });

  describe("TOGGLE_SELECT", () => {
    it("adds a key to selection", () => {
      const next = reducer(initialState, { type: "TOGGLE_SELECT", payload: 100 });
      expect(next.selectedIds).toContain(100);
    });

    it("removes a key already in selection", () => {
      const state = { ...initialState, selectedIds: [100] };
      const next = reducer(state, { type: "TOGGLE_SELECT", payload: 100 });
      expect(next.selectedIds).not.toContain(100);
    });
  });

  describe("SELECT_ALL", () => {
    it("selects all result keys", () => {
      const state = { ...initialState, results: [item1, item2] };
      const next = reducer(state, { type: "SELECT_ALL" });
      expect(next.selectedIds).toEqual([100, 101]);
    });
  });

  describe("DESELECT_ALL", () => {
    it("clears the selection", () => {
      const state = { ...initialState, selectedIds: [100, 101] };
      const next = reducer(state, { type: "DESELECT_ALL" });
      expect(next.selectedIds).toEqual([]);
    });
  });

  describe("DUPLICATE_SELECTED", () => {
    it("appends copies with new keys and clears selection", () => {
      const state = { ...initialState, results: [item1, item2], selectedIds: [100] };
      const next = reducer(state, { type: "DUPLICATE_SELECTED" });
      expect(next.results).toHaveLength(3);
      expect(next.results[2]).toMatchObject({ id: 1, login: "torvalds" });
      expect(next.results[2]._key).not.toBe(item1._key);
      expect(next.selectedIds).toEqual([]);
    });

    it("is a no-op when nothing is selected", () => {
      const state = { ...initialState, results: [item1] };
      const next = reducer(state, { type: "DUPLICATE_SELECTED" });
      expect(next.results).toHaveLength(1);
    });
  });

  describe("DELETE_SELECTED", () => {
    it("removes only the selected item and clears selection", () => {
      const state = { ...initialState, results: [item1, item2], selectedIds: [100] };
      const next = reducer(state, { type: "DELETE_SELECTED" });
      expect(next.results).toHaveLength(1);
      expect(next.results[0]).toMatchObject({ id: 2, login: "gvanrossum" });
      expect(next.selectedIds).toEqual([]);
    });

    it("does not delete a duplicate when only the original is selected", () => {
      const duplicate: ResultItem = { ...item1, _key: 999 };
      const state = { ...initialState, results: [item1, item2, duplicate], selectedIds: [100] };
      const next = reducer(state, { type: "DELETE_SELECTED" });
      expect(next.results).toHaveLength(2);
      expect(next.results.some((u) => u._key === 999)).toBe(true);
    });
  });
});
