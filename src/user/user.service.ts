import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  getAll() {
    return 'getAll';
  }

  getById(id: string) {
    return 'getByID ' + id;
  }

  create(newUser: CreateUserDto) {
    return `Created user ${newUser.first_name} ${newUser.second_name}`;
  }
}
