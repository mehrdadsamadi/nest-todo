import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/api/users/users.module';
import { AccessTokenStrategy } from '@/api/auth/strategies/access-token.strategy';
import { RefreshTokenStrategy } from '@/api/auth/strategies/refresh-token.strategy';
import { AuthController } from '@/api/auth/auth.controller';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
