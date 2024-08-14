import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  BadRequestException,
  HttpStatus,
  Res,
  Req,
  UseGuards,
  // UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const userEmail = await this.usersService.findUserByEmail(
      createUserDto.email,
    );

    if (userEmail) {
      throw new BadRequestException(
        `User ${createUserDto.email} already exists`,
      );
    }

    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Req() req: Request) {
    const { id } = req.user as User;
    const user = await this.usersService.findUserById(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userFound } = user;
    return userFound;
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    const { id } = req.user as User;
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Req() req: Request) {
    const { id } = req.user as User;
    return this.usersService.remove(id);
  }
}
