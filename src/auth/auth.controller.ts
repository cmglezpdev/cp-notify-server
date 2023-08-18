import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dth';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }


  @Get('private')
  @UseGuards(AuthGuard())
  privateRoute(@GetUser() user: User) {
    return {
      ok: 200,
      user
    }
  }
}
