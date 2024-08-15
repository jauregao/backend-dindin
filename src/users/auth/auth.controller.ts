import {
  BadRequestException,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res() res: Response, @GetUser() user: User) {
    const token = await this.authService.login(user);
    if (!token) {
      return new BadRequestException('Invalid email or passowrd.');
    }
    return res.status(HttpStatus.OK).json({
      id: user.id,
      name: user.name,
      token: token.access_token,
    });
  }
}
