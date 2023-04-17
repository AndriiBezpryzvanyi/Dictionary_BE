import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('/registration')
  create(@Body() newUser: CreateUserDto) {
    return this.authService.userRegistration(newUser);
  }

  @Post('/login')
  login(@Body() userCredentials: LoginUserDto) {
    return this.authService.userLogin(userCredentials);
  }
}
