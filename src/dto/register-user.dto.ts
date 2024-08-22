import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


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