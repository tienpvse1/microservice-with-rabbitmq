import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { join } from 'path';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        JwtModule.register({
          signOptions: { expiresIn: '3600s', algorithm: 'RS256' },
          privateKey: readFileSync(
            join(__dirname, '../../../../../', 'private.pem'),
          ),
          publicKey: readFileSync(
            join(__dirname, '../../../../../', 'public.pem'),
          ),
          verifyOptions: { algorithms: ['RS256'] },
        }),
      ],
    })
      .overrideProvider(JwtService)
      .useValue({
        sign: () => 'dummy key',
      })
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
    jest.spyOn(jwtService, 'sign');
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
});
