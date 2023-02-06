import { Module } from "@nestjs/common";

import { SendNotification } from "@/app/use-cases";
import { DatabaseModule } from "../database";
import { KafkaConsumerService, NotificationsController } from "./";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [KafkaConsumerService, SendNotification],
})
export class MessagingModule {}
