import { Controller, Post, Body, UsePipes, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from '../dtos/login.dto';

import { LoginService } from '../services/login.service';
import { LocalAuthGuard } from '../strategies/local.strategy';

@Controller('api/v1/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  @UsePipes(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto, @Res() response: Response): Promise<any> {
    console.log(loginDto);

    await this.loginService.validateUser(loginDto);

    const token = await this.loginService.generateToken(loginDto);

    return response.status(200).json({ token });
  }
}
