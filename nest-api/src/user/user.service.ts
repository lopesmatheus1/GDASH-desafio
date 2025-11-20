import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schema/user.schema'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec()
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).select('-password').exec()

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async create(data: CreateUserDto): Promise<UserDocument> {
    return await this.userModel.create(data)
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id)
  }

  async update(id: string, data: UpdateUserDto): Promise<UserDocument> {
    const user = await this.findById(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (data.email && data.email !== user.email) {
      const emailExists = await this.findByEmail(data.email)
      if (emailExists) {
        throw new ConflictException('Email already in use')
      }
    }

    if (data.name) {
      user.name = data.name
    }
    return await user.save()
  }
}
