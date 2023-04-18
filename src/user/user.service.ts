import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getById(id: number): Promise<User> {
    return await this.userModel.findById(id);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  // async removeUser(id: string) {
  //   return await this.userRepository.delete(id);
  // }
}
