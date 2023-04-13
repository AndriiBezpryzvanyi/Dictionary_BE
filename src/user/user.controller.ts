import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.getById(+id);
  }

  @Post()
  create(@Body() newUser: CreateUserDto) {
    return this.userService.userRegistration(newUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}