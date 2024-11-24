import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
