import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';

import { LoginService } from '../services/login.service';
import { LocalAuthGuard } from '../strategies/local.strategy';

@Controller('api/v1/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  @UsePipes(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto): Promise<any> {
    await this.loginService.validateUser(loginDto);

    const token = await this.loginService.generateToken(loginDto);

    return { token };
  }
}
