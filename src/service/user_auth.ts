import { encryptionService } from "./user_encryption";
import { BadRequestException, HttpException, Injectable, HttpStatus  } from "@nestjs/common";
import { UserService } from "./user";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor (private readonly userService: UserService ){}

    async validateUser(name: string, password: string): Promise<any>{
            const user = await this.userService.findOneByOption({name})
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
        const expiresIn = '1d'
        const secrect = 'secrect'
        const payload = {
            name: user.name,
            sub: user.id
        }
        const token  = jwt.sign(payload, secrect, {expiresIn})
        return {
            expires_in: expiresIn,
            token: token
        }
        
    }

}

    