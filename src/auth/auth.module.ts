import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [
    UsersModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_CONSTANTS,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
