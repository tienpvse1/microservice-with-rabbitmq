import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  login(@Body() body: LoginDto) {
    const result = this.authService.login(body.username, body.password);
    return result;
  }
  @Post('verify')
  verify(@Body('token') token: string) {
    return this.authService.verify(token);
  }
}
