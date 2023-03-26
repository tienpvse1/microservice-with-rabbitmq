import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}
  login(username: string, password: string) {
    if (username !== 'tienpvse' || password !== 'password')
      throw new UnauthorizedException('bad credential');
    const token = this.jwt.sign({ username, password });
    return { token };
  }
}
