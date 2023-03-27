import { UnauthorizedException } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { readFileSync } from 'fs';
import { join } from 'path';
import { mockJwtService } from '../__mocks__/jwt.service';
import { ConfigModule } from '@nestjs/config';
import config from '@app/config';
describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        ConfigModule.forRoot({
          load: [config],
        }),
        JwtModule.register({
          signOptions: { expiresIn: '3600s', algorithm: 'RS256' },
          privateKey: readFileSync(
            join(__dirname, '../../../../../../', 'private.pem'),
          ),
          publicKey: readFileSync(
            join(__dirname, '../../../../../../', 'public.pem'),
          ),
          verifyOptions: { algorithms: ['RS256'] },
        }),
      ],
    })
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should sign the token', () => {
    const stub: LoginDto = { username: 'tienpvse', password: 'password' };
    service.login(stub.username, stub.password);
    const token = jwtService.sign(stub);
    expect(jwtService.sign).toHaveBeenCalled();
    expect(typeof token).toBe('string');
  });
  it('should throw error', () => {
    try {
      const stub: LoginDto = { username: 'tienpvse1', password: 'password' };
      service.login(stub.username, stub.password);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.message).toBe('bad credential');
    }
  });
  describe('verify', () => {
    it('should call the verify function', () => {
      const token = '';
      service.verify(token);
      expect(jwtService.verify).toHaveBeenCalledWith(token);
    });
  });
});
