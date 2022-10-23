import {IsString, IsOptional, IsNotEmpty, IsNumber, Length, IsEmail, IsPhoneNumber, } from 'class-validator'

export class CreateUserDTO{
    @IsString()
    @IsNotEmpty()
    name: string
    password: string
    region: string
    
    
    @IsEmail()
    mail: string

    @IsPhoneNumber()
    phone_num: string
}