import { EType } from '@prisma/client';
import { IsNotEmpty, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'Type can not be empty.' })
  type: EType;

  @IsNotEmpty({ message: 'Description can not be empty.' })
  description: string;

  @Min(0, { message: 'Value must be greater than zero.' })
  @IsNotEmpty({ message: 'Value can not be empty.' })
  value: number;

  @IsNotEmpty({ message: 'Date can not be empty.' })
  date: string;

  @IsNotEmpty({ message: 'Category id can not be empty.' })
  category_id: string;
}
