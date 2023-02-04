import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";

import {
  CancelNotification,
  CountRecipientNotifications,
  GetRecipientNotifications,
  ReadNotification,
  SendNotification,
  UnreadNotification,
} from "@/app/use-cases";
import { CreateNotificationBody } from "..";
import { NotificationViewModel } from "../";

@Controller("notifications")
export class NotificationsController {
  constructor(
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
  ) {}

  @Get("from/recipient/:recipientId")
  async getFromRecipient(@Param("recipientId") recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Get("count/from/recipient/:recipientId")
  async countFromRecipient(@Param("recipientId") recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Patch(":id/read")
  async read(@Param("id") id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(":id/unread")
  async unread(@Param("id") id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async send(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }

  @Patch(":id/cancel")
  async cancel(@Param("id") id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }
}
