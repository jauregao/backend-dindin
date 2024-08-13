import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private prismaService: PrismaService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const id = request.params.id;

    if (id) {
      const user = await this.prismaService.user.findFirst({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      request.user = user;
    }

    return next.handle();
  }
}
