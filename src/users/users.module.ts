import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserInterceptor } from './users.interceptor';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserInterceptor],
  exports: [UsersService],
})
export class UsersModule {}
