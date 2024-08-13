import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async login(@Body() data: LoginUserDto, @Res() res: Response) {
    const user = await this.authService.login(data);
    return res.status(HttpStatus.OK).json(user);
  }
}
