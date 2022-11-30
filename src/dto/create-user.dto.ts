import {IsString, IsOptional, IsNotEmpty, IsNumber, MinLength, IsEmail, } from 'class-validator'

export class CreateUserDTO{
    @IsString()
    @IsNotEmpty()
    username: string

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