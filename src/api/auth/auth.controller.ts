import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/api/auth/auth.service';
import { UsersService } from '@/api/users/users.service';
import { LoginDto } from '@/api/auth/dtos/login.dto';
import { hashUtil } from '@/common/utils/hash.util';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() dto: LoginDto) {
    const hashed = await hashUtil(dto.password);

    return this.usersService.create(dto.phone, hashed);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.phone, dto.password);

    return this.authService.login(user);
  }
}
