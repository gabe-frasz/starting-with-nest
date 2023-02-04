import { Module } from "@nestjs/common";

import {
  CancelNotification,
  CountRecipientNotifications,
  GetRecipientNotifications,
  ReadNotification,
  SendNotification,
  UnreadNotification,
} from "@/app/use-cases";
import { NotificationsController } from ".";
import { DatabaseModule } from "../database";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
