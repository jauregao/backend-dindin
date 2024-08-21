import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/users/auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';
import { Response } from 'express';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Res() res: Response,
    @GetUser() user: User,
  ) {
    const transaction = await this.transactionsService.create(
      createTransactionDto,
      user.id,
    );
    return res.status(HttpStatus.CREATED).json(transaction);
  }

  @Get()
  async findAll(
    @GetUser() user: User,
    @Res() res: Response,
    @Query('filter') filter?: string[],
  ) {
    const transactions = await this.transactionsService.findAll(
      user.id,
      filter,
    );
    return res.status(HttpStatus.OK).json(transactions);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @GetUser() user: User,
  ) {
    const transaction = await this.transactionsService.findOne(id, user.id);
    return res.status(HttpStatus.OK).json(transaction);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Res() res: Response,
    @GetUser() user: User,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.transactionsService.update(
      id,
      updateTransactionDto,
      user.id,
    );
    return res.status(HttpStatus.OK).json(transaction);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response, @GetUser() user: User) {
    this.transactionsService.remove(id, user.id);
    return res.status(HttpStatus.NO_CONTENT).json();
  }
}
