import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10),
    );
    return hashedPassword;
  }

  async userRegistration(receivedUser: CreateUserDto) {
    return this.userRepository.save({
      ...receivedUser,
      password: await this.hashPassword(receivedUser.password),
    });
  }

  async userLogin(userCredentials: LoginUserDto) {
    return userCredentials;
  }
}
