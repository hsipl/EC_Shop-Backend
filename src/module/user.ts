import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserController } from "src/controller/user"
import { UserService } from "src/service/user"
import { User } from "src/entity/user.entity"
import { AuthService } from "src/service/user_auth"
import { JwtStrategy } from "src/service/local.auth"


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, AuthService, JwtStrategy ],
    exports: [UserService, AuthService],
})

export class UserMoudle {}