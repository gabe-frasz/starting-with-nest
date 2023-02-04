import { InMemoryNotificationRepository, makeNotification } from "@test";
import { NotificationNotFound } from "./errors/notification-not-found";
import { UnreadNotification } from "./unread-notification";

describe("Unread notification use-case", () => {
  it("should set a notification as unread", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it("should not unread a non existing notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: "non-existing-id",
      });
    }).rejects.toThrowError(NotificationNotFound);
  });
});
