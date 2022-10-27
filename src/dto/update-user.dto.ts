import {IsString, IsOptional, IsNotEmpty, isNotEmpty, IsEmail, MinLength} from 'class-validator'

export class UpdateUserDTO{
    @IsString()
    @IsNotEmpty()
    name: string
    password: string
    region: string
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MinLength(6,{
        message: 'Length need longer than 6'
    })
    mail: string


    @IsString()
    @IsNotEmpty()
    phone_num: string
}