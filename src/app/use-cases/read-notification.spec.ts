import { InMemoryNotificationRepository, makeNotification } from "@test";
import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notification";

describe("Read notification use-case", () => {
  it("should set a notification as read", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it("should not read a non existing notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: "non-existing-id",
      });
    }).rejects.toThrowError(NotificationNotFound);
  });
});
