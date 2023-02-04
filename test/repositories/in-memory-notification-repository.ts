import { Notification } from "@/app/entities";
import { NotificationRespository } from "@/app/repositories";

export class InMemoryNotificationRepository implements NotificationRespository {
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (n) => n.id === notificationId,
    );

    return notification ?? null;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((n) => n.recipientId === recipientId);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((n) => n.recipientId === recipientId)
      .length;
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (n) => n.id === notification.id,
    );

    this.notifications[notificationIndex] = notification;
  }
}
