import { Module } from "@nestjs/common";

import { DatabaseModule } from "./infra/database";
import { HttpModule } from "./infra/http";
import { MessagingModule } from "./infra/messaging";

@Module({
  imports: [HttpModule, DatabaseModule, MessagingModule],
})
export class AppModule {}
