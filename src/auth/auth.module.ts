import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({ global: true }),
  ],
})
export class AuthModule {}
