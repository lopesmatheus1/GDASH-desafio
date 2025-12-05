import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'

import { UserModule } from 'src/user/user.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { HashModule } from 'src/common/hashing/hash.module'
import { jwtConstants } from './constants'
import { AuthGuard } from './auth.guard'
import { Reflector } from '@nestjs/core/services/reflector.service'

@Module({
  imports: [
    UserModule,
    HashModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6h' },
    }),
    Reflector,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
