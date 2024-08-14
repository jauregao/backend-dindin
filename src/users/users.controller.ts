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
import { GetUser } from 'src/decorators/user.decorator';

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
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @GetUser() user: User,
  ) {
    const { id } = user;
    const userExists = await this.usersService.findUserById(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userFound } = userExists;
    return res.status(HttpStatus.OK).json(userFound);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
    @GetUser() user: User,
  ) {
    const { id } = user;
    this.usersService.update(id, updateUserDto);
    return res.status(HttpStatus.NO_CONTENT).json();
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Res() res: Response, @GetUser() user: User) {
    const { id } = user;
    this.usersService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).json();
  }
}
