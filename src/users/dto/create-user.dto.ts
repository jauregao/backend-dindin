import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'Name can not be empty.' })
  name: string;

  @IsNotEmpty({ message: 'Email can not be empty.' })
  @IsEmail({}, { message: 'Must be a valid email.' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be empty.' })
  @MinLength(6, {
    message: 'password must be longer than or equal to 6 characters.',
  })
  password: string;
}
