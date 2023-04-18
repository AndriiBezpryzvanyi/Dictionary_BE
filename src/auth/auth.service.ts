import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private userService: UserService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10),
    );
    return hashedPassword;
  }

  async userRegistration(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.collection.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      return null;
    }
    const newUser = new this.userModel({
      ...CreateUserDto,
      password: await this.hashPassword(createUserDto.password),
    });
    return newUser.save();
  }

  // async validateUser(
  //   email: string,
  //   password: string,
  // ): Promise<Omit<UserEntity, 'password'> | null> {
  //   const user = await this.userService.getByEmail(email);
  //   if (user && bcrypt.compareSync(password, user.password)) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  // async userLogin(userCredentials: LoginUserDto) {
  //   const user = await this.validateUser(
  //     userCredentials.email,
  //     userCredentials.password,
  //   );
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid email or password');
  //   }
  //   const payload = {
  //     firstName: user.first_name,
  //     secondName: user.second_name,
  //     id: user.id,
  //   };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }
}
