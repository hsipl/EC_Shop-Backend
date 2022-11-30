import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserController } from "src/controller/user"
import { UserService } from "src/service/user"
import { User } from "src/entity/user.entity"




@Module({
    imports: [
        TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [ UserService ],
    exports: [UserService],
})

export class UserMoudle {}