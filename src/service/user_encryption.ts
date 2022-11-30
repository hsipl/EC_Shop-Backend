import * as bcryptjs from 'bcryptjs'

export class encryptionService{
    static async generateHash(password: string) {
        return bcryptjs.hashSync(password, 10)
    }

    static async comparePassword(oldPassword, newPassword){
        return bcryptjs.compareSync(oldPassword, newPassword)
    }
} 