import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@/api/users/schemas/user.schema';
import { Model } from 'mongoose';
import { mapDocumentToDto } from '@/common/utils/map-document-to-dto.util';
import { UserResponseDto } from '@/api/users/dtos/user-response.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(phone: string, hashedPassword: string) {
    const user = await this.userModel.create({
      phone,
      password: hashedPassword,
    });

    return mapDocumentToDto<UserResponseDto>(user, UserResponseDto);
  }

  async findByPhone(phone: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ phone });
    if (!user) {
      throw new NotFoundException(`User with phone ${phone} not found`);
    }

    return user;
  }
}
