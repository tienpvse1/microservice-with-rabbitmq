import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          signOptions: {
            expiresIn: '3600s',
            algorithm: 'RS256',
            header: {
              alg: 'RS256',
              kid: config.getOrThrow('jwt.kid'),
            },
          },
          privateKey: readFileSync(join(__dirname, '../../../', 'private.pem')),
          publicKey: readFileSync(join(__dirname, '../../../', 'public.pem')),
          verifyOptions: { algorithms: ['RS256'] },
        };
      },
    }),
  ],
})
export class AuthModule {}
