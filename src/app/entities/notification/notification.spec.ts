import { Content } from "./content";
import { Notification } from "./notification";

describe("Notification", () => {
  it("should create a notification", () => {
    const notification = new Notification({
      recipientId: "someId",
      content: new Content("some content"),
      category: "some category",
    });

    expect(notification).toBeTruthy();
  });
});
