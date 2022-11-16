import { Module } from "@nestjs/common"
import { AuthService } from "src/service/user_auth"
import { JwtStrategy } from "src/service/user_jwt"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt/dist"
import { UserMoudle } from "./user"
import { AuthController } from "src/controller/user_auth"
import { ConfigModule } from '@nestjs/config';




@Module({
    imports: [
      ConfigModule.forRoot(),
      UserMoudle,
      PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.register({
        secret: process.env.SECRECT,
        signOptions: {expiresIn: '1d'}
      }),
   
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})

export class AuthMoudle {}