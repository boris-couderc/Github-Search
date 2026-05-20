import { searchUsers } from "./api";

const mockUser = { id: 1, login: "torvalds", avatar_url: "", html_url: "" };

function mockFetch(status: number, body: unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(body),
    }),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("searchUsers", () => {
  it("returns users on success", async () => {
    mockFetch(200, { items: [mockUser] });
    const result = await searchUsers("torvalds", new AbortController().signal);
    expect(result).toEqual([mockUser]);
  });

  it("returns empty array when items is empty", async () => {
    mockFetch(200, { items: [] });
    const result = await searchUsers("x", new AbortController().signal);
    expect(result).toEqual([]);
  });

  it("throws rate-limited on 403", async () => {
    mockFetch(403, {});
    await expect(
      searchUsers("x", new AbortController().signal),
    ).rejects.toThrow("rate-limited");
  });

  it("throws rate-limited on 429", async () => {
    mockFetch(429, {});
    await expect(
      searchUsers("x", new AbortController().signal),
    ).rejects.toThrow("rate-limited");
  });

  it("throws error on other non-ok status", async () => {
    mockFetch(500, {});
    await expect(
      searchUsers("x", new AbortController().signal),
    ).rejects.toThrow("error");
  });

  it("rejects with AbortError when signal is aborted", async () => {
    const controller = new AbortController();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new DOMException("Aborted", "AbortError")),
    );
    const error = await searchUsers("x", controller.signal).catch((e) => e);
    expect(error.name).toBe("AbortError");
  });
});
