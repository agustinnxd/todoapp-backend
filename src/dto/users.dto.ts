import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"


export class RegisterUserDto {
    
    @IsString()
    @IsNotEmpty()
    @Length(4, 15)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6)
    password: string
}

export class LoginUserDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string

    @IsString()
    @IsOptional()
    @Length(4,15)
    username?: string
}