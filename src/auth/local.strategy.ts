import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { ValidateUserDto } from './dto/validate-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string) {
    const user = this.authService.validateUser({ username, password });
    // console.log(validateUserDto);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
