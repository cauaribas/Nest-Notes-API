import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { compare } from 'bcrypt';

interface ValidateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: ValidateUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    return user;
  }
}
