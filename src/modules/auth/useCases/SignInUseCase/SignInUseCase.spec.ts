import { JwtService } from '@nestjs/jwt';
import { SignInUseCase } from './SignInUseCase';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { UserPayload } from '../../models/UserPayload';

let signInUseCase: SignInUseCase;
let jwtService: JwtService;

describe('SignInUseCase', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInUseCase = new SignInUseCase(jwtService);
  });

  it('Should be able to create valid access token', async () => {
    const user = makeUser({});

    const token = await signInUseCase.execute({ user });

    const payload = jwtService.decode(token) as UserPayload;

    expect(payload.sub).toBe(user.id);
  });
});
