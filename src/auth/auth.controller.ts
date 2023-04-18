import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  async create(@Body() newUser: CreateUserDto, @Res() res: Response) {
    await this.authService.userRegistration(newUser);
    res.statusCode = HttpStatus.CREATED;
    return res.send('User created');
  }

  // @Post('/login')
  // login(@Body() userCredentials: LoginUserDto) {
  //   return this.authService.userLogin(userCredentials);
  // }
}
