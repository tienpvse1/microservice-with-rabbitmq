import { UnauthorizedException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
describe('AuthController', () => {
  let controller: AuthController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
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
    }).compile();

    controller = module.get<AuthController>(AuthController);
    expect(module).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('test the login function', () => {
    it('should throw error when call the login function', () => {
      try {
        const stub = { password: 'tienpvse', username: 'tienpvse' };
        controller.login(stub);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
    it('should return with no error', () => {
      const stub = { password: 'password', username: 'tienpvse' };
      const { token } = controller.login(stub);
      expect(typeof token).toBe('string');
    });
  });
});
