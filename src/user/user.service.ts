import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return user;
    } else {
      return `User with id ${id} not found`;
    }
  }

  async userRegistration(receivedUser: CreateUserDto) {
    return this.userRepository.save({
      ...receivedUser,
      // password: await bcrypt.hash(receivedUser.password, 10),
      password: await bcrypt.hash(receivedUser.password, 10),
    });
  }

  async removeUser(id: string) {
    return await this.userRepository.delete(id);
  }
}
