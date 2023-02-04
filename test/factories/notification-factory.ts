import { Content, Notification, NotificationProps } from "@/app/entities";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}): Notification {
  return new Notification({
    recipientId: "some-id",
    content: new Content("some content"),
    category: "some-category",
    ...override,
  });
}
