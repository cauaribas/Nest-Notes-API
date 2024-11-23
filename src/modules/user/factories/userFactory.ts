import { User } from '../entities/User';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      ...override,
    },
    id,
  );
};
