import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}
  async create(createUserDto: Prisma.UserCreateInput) {
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 16);
    await this.databaseService.user.create({
      data: {
        password: hashedPassword,
        ...createUserDto,
      },
    });
  }

  findOne(email: string) {
    return this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
