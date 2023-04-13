import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, Repository } from 'typeorm';
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
    return this.userRepository.save(receivedUser);
    // const queryRunner = this.dataSource.createQueryRunner();

    // await queryRunner.connect();
    // await queryRunner.startTransaction();

    // const newUser = new UserEntity();
    // newUser.first_name = receivedUser.first_name;
    // newUser.second_name = receivedUser.second_name;
    // newUser.email = receivedUser.email;
    // newUser.password = await bcrypt.hash(receivedUser.password, 10);

    // try {
    //   await queryRunner.manager.save(newUser);
    //   await queryRunner.commitTransaction();
    //   return `Created user ${newUser.first_name} ${newUser.second_name}`;
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();
    //   return 'Something went wrong';
    // } finally {
    //   await queryRunner.release();
    // }
  }

  async removeUser(id: string) {
    return await this.userRepository.delete(id);
  }
}
