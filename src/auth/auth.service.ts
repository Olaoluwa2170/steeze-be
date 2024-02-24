import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async signUp(createUserDto: Prisma.UserCreateInput) {
    return await this.databaseService.user.create({
      data: createUserDto,
    });
  }
}
