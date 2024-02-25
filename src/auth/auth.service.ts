import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserDto } from './dto/validate-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(validateUserDto: ValidateUserDto) {
    const { email, password } = validateUserDto;
    const user = await this.usersService.findOne(email);
    const matchedPassword = bcrypt.match(password, user.password);
    if (user && matchedPassword) {
      return user;
    }
    return new UnauthorizedException('Unauthorized Access');
  }

  async login(user: any) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
