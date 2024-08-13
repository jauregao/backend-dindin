import { EType } from '@prisma/client';

export class CreateTransactionDto {
  type: EType;
  description: string;
  value: number;
  date: string;
  category_description: string;
}
