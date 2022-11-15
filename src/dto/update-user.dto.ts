import {IsString, IsOptional, IsNotEmpty, isNotEmpty, IsEmail, MinLength} from 'class-validator'

export class UpdateUserDTO{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6,{
        message: 'Password length need longer than 6'
    })
    password: string

    
    @IsString()
    @IsNotEmpty()
    region: string
 
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    mail: string


    @IsString()
    @IsNotEmpty()
    phone_num: string
}