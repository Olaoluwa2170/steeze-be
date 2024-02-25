// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { ValidateUserDto } from './dto/validate-user.dto';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super();
//   }

//   async validate(validateUserDto: ValidateUserDto){
//         const user = this.authService.validateUser(validateUserDto);
//         if (!uesr) {
//             throw ;
//         }
//   }
// }
