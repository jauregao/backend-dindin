import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPass = this.generateHash(createUserDto.password);
    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPass,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...createdUser } = user;

    return createdUser;
  }

  async findUserById(id: string) {
    return await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
  }

  async findUserByEmail(email: string) {
    return await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return;
  }

  async remove(id: string) {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    return;
  }

  generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
