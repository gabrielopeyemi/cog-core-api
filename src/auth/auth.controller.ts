import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { generateJWTToken } from 'src/utills/jwt';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const details = await this.authService.login(loginAuthDto);
    return {
      userDatails: details,
      token: generateJWTToken(details),
      loggedIn: true,
    };
  }

}
