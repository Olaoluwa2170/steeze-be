import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateUserDto } from './dto/validate-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  async login(@Body() validateUserDto: ValidateUserDto) {
    return this.authService.login(validateUserDto);
  }
}
