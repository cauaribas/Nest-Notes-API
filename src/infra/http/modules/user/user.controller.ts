import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserBody } from './dtos/CreateUserBody';

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() body: CreateUserBody) {
    const { name, email, password } = body;

    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    return user;
  }
}
