import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Request,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  async getProfile(@Request() req) {
    const user = await this.userService.findById(req.user.id)

    return user
  }

  @HttpCode(HttpStatus.OK)
  @Patch('me')
  async updateProfile(@Request() req, @Body() body: UpdateUserDto) {
    const user = await this.userService.update(req.user.id, body)

    return user
  }

  @HttpCode(HttpStatus.OK)
  @Delete('me')
  async deleteProfile(@Request() req) {
    await this.userService.remove(req.user.id)
    return { message: 'User deleted successfully' }
  }
}
