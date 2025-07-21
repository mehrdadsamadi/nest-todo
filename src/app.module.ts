import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from '@/api/todo/todo.module';
import { AuthController } from '@/api/auth/auth.controller';
import { AuthModule } from '@/api/auth/auth.module';
import { UsersModule } from '@/api/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ?? 'mongodb://localhost:27017/nest-todo',
    ),
    TodoModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
