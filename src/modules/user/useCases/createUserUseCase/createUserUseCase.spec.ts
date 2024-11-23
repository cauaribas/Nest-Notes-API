import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory';
import { CreateUserUseCase } from './createUserUseCase';
import { compare } from 'bcrypt';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to create user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      email: 'any_email@email.com',
      name: 'any_name',
      password: 'any_password',
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('should be able to create user with encrypted password', async () => {
    const userPasswordWithoutHash = 'any_password';

    const user = await createUserUseCase.execute({
      email: 'any_email@email.com',
      name: 'any_name',
      password: userPasswordWithoutHash,
    });

    const userPasswordWithHash = await compare(
      userPasswordWithoutHash,
      user.password,
    );

    expect(userPasswordWithHash).toBeTruthy();
  });
});
