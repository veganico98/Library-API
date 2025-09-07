import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { email, password }: AuthLoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }

  @Post('forget')
  forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  reset(@Body() { password, token }: AuthResetDto) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  me(@User() user) {
    return { user }
  }
}