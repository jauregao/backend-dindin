import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [UsersController, AuthController],
  providers: [UsersService],
  imports: [AuthModule],
})
export class UsersModule {}
