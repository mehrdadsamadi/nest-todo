import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/api/users/users.service';
import { compare } from '@/common/utils/hash.util';
import { mapDocumentToDto } from '@/common/utils/map-document-to-dto.util';
import { UserResponseDto } from '@/api/users/dtos/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(
    phone: string,
    password: string,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findByPhone(phone);
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('شماره موبایل یا پسورد اشتباه است');
    }

    return mapDocumentToDto<UserResponseDto>(user, UserResponseDto);
  }

  async login(user: UserResponseDto) {
    const payload = { sub: user.id, phone: user.phone };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '1d',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }
}
