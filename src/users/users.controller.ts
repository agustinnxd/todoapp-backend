import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto, UpdateUserDto } from 'src/dto/users.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post('/register')
    async register(@Res({ passthrough: true }) response: Response, @Body() body: RegisterUserDto) {

        try {
            const { access_token } = await this.usersService.registerUser(body);
            response.cookie('token', access_token, { sameSite: 'none', secure: true, httpOnly: false })

            return {
                status: "created",
                access_token
            }
        } catch (error) {
            if (error.code === 11000) {
                throw new HttpException({ error: "Bad Request", message: ['email already registered'] }, 400)
            }
            throw error
        }
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUser(@Param('id') id:string) {
        return this.usersService.getUser(id)
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.updateUser(id, body);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return await this.usersService.deleteUser(id)        
    }
}
