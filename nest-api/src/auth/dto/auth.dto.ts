import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class SignUpDTO {
  @MinLength(2)
  @MaxLength(150)
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password: string
}

export class SignInDTO {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password: string
}
