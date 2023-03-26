import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '3600s', algorithm: 'RS256' },
      privateKey: readFileSync(join(__dirname, '../../../', 'private.pem')),
      publicKey: readFileSync(join(__dirname, '../../../', 'public.pem')),
      verifyOptions: { algorithms: ['RS256'] },
    }),
  ],
})
export class AuthModule {}
