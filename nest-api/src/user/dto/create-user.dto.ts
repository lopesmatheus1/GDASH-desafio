import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(150)
  name: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password: string
}
