import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@prisma/client';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const token = await this.authService.login(user);
    return res.status(HttpStatus.OK).json({
      id: user.id,
      name: user.name,
      token: token.access_token,
    });
  }
}
