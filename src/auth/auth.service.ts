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
    const { username: email, password } = validateUserDto;
    const user = await this.usersService.findOne(email);
    console.log(email, user);
    const matchedPassword = bcrypt.compare(password, user.password);
    if (user && matchedPassword) {
      const access_token = this.jwtService.sign(email);
      return access_token;
    }
    return new UnauthorizedException('Unauthorized Access');
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
