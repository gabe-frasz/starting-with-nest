import { InMemoryNotificationRepository, makeNotification } from "@test";
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe("Count recipient notifications use-case", () => {
  it("should count recipient notifications", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: "recipient-1",
      }),
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: "recipient-1",
      }),
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: "recipient-2",
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: "recipient-1",
    });

    expect(count).toBe(2);
  });

  it("should return 0 when there is no notifications for recipient", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: "some-invalid-id",
    });

    expect(count).toBe(0);
  });
});
