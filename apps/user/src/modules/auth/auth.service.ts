import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}
  login(username: string, password: string) {
    if (username !== 'tienpvse' || password !== 'password')
      throw new UnauthorizedException('bad credential');
    const token = this.jwt.sign(
      { username, password },
      {
        header: {
          alg: 'RS256',
          kid: 'this_value_to_prevent_default',
        },
      },
    );
    return { token };
  }

  verify(token: string) {
    return this.jwt.verify(token);
  }
}
