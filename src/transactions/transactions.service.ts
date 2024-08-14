import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto, user_id: string) {
    const category = await this.prismaService.category.findFirst({
      where: { id: createTransactionDto.category_id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const transaction = await this.prismaService.bankTransaction.create({
      data: {
        type: createTransactionDto.type,
        description: createTransactionDto.description,
        value: createTransactionDto.value,
        date: new Date(createTransactionDto.date),
        user_id,
        category_description: category.description,
        category_id: category.id,
      },
    });

    return transaction;
  }

  async findAll(user_id: string) {
    return await this.prismaService.bankTransaction.findMany({
      where: {
        user_id,
      },
    });
  }

  async findOne(id: string, user_id: string) {
    const transaction = await this.prismaService.bankTransaction.findFirst({
      where: {
        id,
        user_id,
      },
    });

    return transaction;
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
    user_id: string,
  ) {
    const transaction = await this.prismaService.bankTransaction.update({
      data: {
        user_id,
        ...updateTransactionDto,
      },
      where: {
        id,
        user_id,
      },
    });
    return transaction;
  }

  async remove(id: string, user_id: string) {
    await this.prismaService.bankTransaction.delete({
      where: {
        id,
        user_id,
      },
    });
    return;
  }
}
