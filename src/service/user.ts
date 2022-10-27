import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/entity/user.entity'
import{ CreateUserDTO} from '../dto/create-user.dto'
import {UpdateUserDTO} from '../dto/update-user.dto'
import {encryptionService} from './user_encryption' 

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
        ) {}

        async createUser(createUserDTO: CreateUserDTO) :Promise<User>{
            return this.userRepository.save(createUserDTO)
        }

        async findAllUser() : Promise<User[]>{
            return this.userRepository.find()
        }

        async findUserById (id: number): Promise <User | undefined>{
            let user: User
        
                user = await this.userRepository.findOneBy({id})
                if(!user){
                    throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
                }
                
            return user
        }


        async updateUser(id: number, updateUserDTO: UpdateUserDTO): Promise<boolean>{
            const foundUser = await this.userRepository.findOneBy({id})

            if(!foundUser){
                throw new HttpException('user not found', HttpStatus.NOT_FOUND)
            }
            return (await this.userRepository.save({
                ...foundUser,
                ...updateUserDTO,
            }))
            ?true
            :false
        }

        async deleteUser(id: number): Promise<boolean>{
            const foundUser = await this.userRepository.findOneBy({id})

            if(!foundUser){
                throw new HttpException('user not found', HttpStatus.NOT_FOUND)
            }
            return (await this.userRepository.delete(id)) ?true :false
        }


  
     
}