import { EType } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  type: EType;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  category_id: string;
}
