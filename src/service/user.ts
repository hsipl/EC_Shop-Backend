import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BeforeInsert, BeforeUpdate, Repository } from 'typeorm'
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
            const {username ,mail, phone_num } = createUserDTO
            const existUser = await this.userRepository.findOne({
                where: {
                    username: username,
                    mail: mail,
                    phone_num: phone_num
                }

            })
            if (existUser){
                throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
            }
            createUserDTO.password = await encryptionService.generateHash(createUserDTO.password)
            const newUser = await this.userRepository.create(createUserDTO)
            return this.userRepository.save(newUser)
        }

        async findAllUser() : Promise<User[]>{
            return this.userRepository.find()
        }

        async findOneByOption(options: Object): Promise<User | null> {
            let user: User
            user = await this.userRepository.findOne({
                where: options
            })
            if(!user){
                throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
            }

            return user
        }

        async findUserById (id: number): Promise <User | undefined>{
            let user: User
        
                user = await this.userRepository.findOne({where: {
                    id: id
                }})
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

            // const checkPassowrd = await encryptionService.comparePassword(foundUser.password, updateUserDTO.password)
            // if (checkPassowrd == true){
            //     throw new HttpException('Password need different', HttpStatus.INTERNAL_SERVER_ERROR)
            // }
            
            // console.log(checkPassowrd)
        
            updateUserDTO.password = await encryptionService.generateHash(updateUserDTO.password)
            
            const updateUser = await this.userRepository.update(id, updateUserDTO)
            console.log(updateUserDTO, updateUser)
            return updateUser  ?true :false
            
       
        }

        async deleteUser(id: number): Promise<boolean>{
            const foundUser = await this.userRepository.findOneBy({id})

            if(!foundUser){
                throw new HttpException('user not found', HttpStatus.NOT_FOUND)
            }
            return (await this.userRepository.softDelete(id)) ?true :false
        }


  
     
}