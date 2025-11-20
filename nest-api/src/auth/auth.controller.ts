import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDTO, SignUpDTO } from './dto/auth.dto'
import { Public } from './decorator/public.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() body: SignUpDTO) {
    return this.authService.signUp(body)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() body: SignInDTO) {
    return this.authService.signIn(body)
  }
}
