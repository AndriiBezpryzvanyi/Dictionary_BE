import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getById(id: number): Promise<UserEntity | string> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) return user;
    return `User with id ${id} not found`;
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  async removeUser(id: string) {
    return await this.userRepository.delete(id);
  }
}
