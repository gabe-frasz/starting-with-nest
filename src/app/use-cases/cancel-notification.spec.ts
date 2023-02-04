import { InMemoryNotificationRepository, makeNotification } from "@test";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";

describe("Cancel notification use-case", () => {
  it("should cancel a notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it("should not cancel a non existing notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: "non-existing-id",
      });
    }).rejects.toThrowError(NotificationNotFound);
  });
});
