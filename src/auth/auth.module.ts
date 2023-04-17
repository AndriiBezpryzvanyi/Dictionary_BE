import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService, UserService, JwtService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
  ],
})
export class AuthModule {}
