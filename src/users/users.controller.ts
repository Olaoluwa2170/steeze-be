import { Controller, Body, Post, Res } from '@nestjs/common';
// , Get, Post, Body, Patch, Param, Delete;
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  create(@Body() createUserDto: Prisma.UserCreateInput, @Res() res: Response) {
    this.usersService.create(createUserDto);
    return res.status(201).json({ message: 'User created' });
  }
}
