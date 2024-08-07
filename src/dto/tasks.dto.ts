import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
import mongoose from "mongoose"

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    @Length(3)
    title: string

    @IsOptional()
    @IsString()
    description?:string

    @IsOptional()
    @IsBoolean()
    done?:boolean
}

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    @Length(3)
    title?: string

    @IsOptional()
    @IsString()
    description?:string

    @IsOptional()
    @IsBoolean()
    done?:boolean
}