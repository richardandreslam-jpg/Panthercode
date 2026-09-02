import { describe, expect, it } from "vitest";
import { collectionId } from "./utils";

describe("collectionId", () => {
  it("creates an id prefixed by the collection", () => {
    expect(collectionId("example")).toMatch(/^example_[0-9a-f-]{36}$/);
  });
});
