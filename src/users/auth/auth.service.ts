import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginUserDto) {
    const user = await this.userService.findUserByEmail(data.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials.');
    }

    const validPass = await bcrypt.compare(data.password, user.password);
    if (!validPass) {
      throw new BadRequestException('Invalid credentials.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    const token = this.jwtService.sign(result);

    return {
      user: result,
      token,
    };
  }
}
