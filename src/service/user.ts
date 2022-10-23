import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/entity/user.entity'
import{ CreateUserDTO} from '../dto/create-user.dto'
import {UpdateUserDTO} from '../dto/update-user.dto'

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
            try{
                user = await this.userRepository.findOneBy({id})
                if(!user){
                    throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
                }
                }

            catch(err){
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
                
            }
            return user
        }


        async updateUser(id: number, updateUserDTO: UpdateUserDTO): Promise<boolean>{
            const foundUser = await this.userRepository.findOneBy({id})

            if(!foundUser){
                throw new HttpException('user not found', 404)
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
                throw new HttpException('user not found',404)
            }
            return (await this.userRepository.delete(id)) ?true :false
        }


  
     
}