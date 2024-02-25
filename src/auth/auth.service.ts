import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserDto } from './dto/validate-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AccessSign } from './jwt-constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    validateUserDto: ValidateUserDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = validateUserDto;
    const user = await this.usersService.findOne(email);
    const matchedPassword = bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      throw new UnauthorizedException('Wrong Password');
    }
    const payload = { email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload, AccessSign),
    };
  }
}
