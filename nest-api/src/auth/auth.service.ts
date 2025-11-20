import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { SignInDTO, SignUpDTO } from './dto/auth.dto'
import { UserService } from 'src/user/user.service'
import { HashService } from 'src/common/hashing/hash.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService
  ) {}
  async signUp(data: SignUpDTO) {
    const userAlreadyExists = await this.userService.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new ConflictException('User already exists')
    }

    const hashedPassword = await this.hashService.hashPassword(data.password)

    const createdUser = await this.userService.create({
      ...data,
      password: hashedPassword,
    })

    return {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
    }
  }

  async signIn(data: SignInDTO) {
    const user = await this.userService.findByEmail(data.email)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const passwordIsValid = await this.hashService.comparePassword(
      data.password,
      user.password
    )
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { id: user.id, email: user.email }
    const accessToken = await this.jwtService.signAsync(payload)

    return { accessToken }
  }
}
