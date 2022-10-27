import * as bcrypt from 'bcrypt'

export class encryptionService{
    static async generateHash(password: string): Promise<string>{
        return bcrypt.hash(password, 10)
    }
}