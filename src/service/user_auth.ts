import { encryptionService } from "./user_encryption";
import { HttpException, Injectable, HttpStatus  } from "@nestjs/common";
import { UserService } from "../service/user";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor (private readonly userService: UserService, private readonly jwtService: JwtService ){}

    async validateUser(username: string, password: string): Promise<any>{
            const user = await this.userService.findOneByOption({username})
            if(!user) {
                throw new HttpException('user not found', HttpStatus.NOT_FOUND)
            }
            const passwordValid = await encryptionService.comparePassword(password, user.password)
            if(passwordValid == false){
                throw new HttpException('password not match',HttpStatus.BAD_REQUEST)
            }

            return true
    
    }

    public async createToken (user: any){
        const payload = {
            username: user.username,
            sub: user.id
        }
        const token  = this.jwtService.sign(payload)
        return {
            message: 'Login sucessfully',
            token: token
        }
        
    }

}

    