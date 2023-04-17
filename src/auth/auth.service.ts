import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
    private readonly jwtService: JwtService,
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

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.userService.getByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async userLogin(userCredentials: LoginUserDto) {
    const user = await this.validateUser(
      userCredentials.email,
      userCredentials.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = {
      firstName: user.first_name,
      secondName: user.second_name,
      id: user.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
