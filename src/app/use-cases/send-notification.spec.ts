import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notification-repository";
import { SendNotification } from "./send-notification";

describe("Send notification use-case", () => {
  it("should send a notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      recipientId: "someId",
      content: "some content",
      category: "some category",
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
