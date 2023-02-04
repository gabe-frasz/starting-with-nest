import { Content } from "./content";

describe("Notification content", () => {
  it("should create a notification content", () => {
    const content = new Content("some content");

    expect(content).toBeTruthy();
  });

  it("should not be able to create a content with less than 5 characters", () => {
    expect(() => new Content("1234")).toThrow();
  });

  it("should not be able to create a content with more than 240 characters", () => {
    expect(() => new Content("1".repeat(241))).toThrow();
  });
});
