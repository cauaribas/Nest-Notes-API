import { ValidateUserUseCase } from './validateUserUseCase';
import { UserRepositoryInMemory } from 'src/modules/user/repositories/UserRepositoryInMemory';
import { hash } from 'bcrypt';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { UnauthorizedException } from '@nestjs/common';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Validate User Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to return user if credentials are valid', async () => {
    const userPasswordWithoutHash = 'any_password';

    const user = makeUser({
      password: await hash(userPasswordWithoutHash, 10),
    });

    userRepositoryInMemory.users = [user];

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: userPasswordWithoutHash,
    });

    expect(result).toEqual(user);
  });

  it('Should be able to throws an error when credentials are incorrect', async () => {
    const userPasswordWithoutHash = 'any_password';

    const user = makeUser({
      password: await hash(userPasswordWithoutHash, 10),
    });

    userRepositoryInMemory.users = [user];

    expect(async () => {
      await validateUserUseCase.execute({
        email: 'incorrect@email.com',
        password: userPasswordWithoutHash,
      });
    }).rejects.toThrow(UnauthorizedException);

    expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: 'incorrect_password',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
