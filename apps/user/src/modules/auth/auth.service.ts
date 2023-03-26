import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private config: ConfigService) {}
  login(username: string, password: string) {
    if (username !== 'tienpvse' || password !== 'password')
      throw new UnauthorizedException('bad credential');
    const token = this.jwt.sign(
      { username, password },
      {
        header: {
          alg: 'RS256',
          kid: this.config.getOrThrow('jwt.kid'),
        },
      },
    );
    return { token };
  }

  verify(token: string) {
    return this.jwt.verify(token);
  }
}
