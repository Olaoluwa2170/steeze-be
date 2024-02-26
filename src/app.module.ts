import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { TicketService } from './ticket/ticket.service';
import { TicketController } from './ticket/ticket.controller';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, TicketModule],
  controllers: [AppController, TicketController],
  providers: [AppService, TicketService],
})
export class AppModule {}
