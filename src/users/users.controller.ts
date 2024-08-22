import { Body, Controller, Get, HttpException, Post, Request, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post('/register')
    async register(@Res({ passthrough: true }) response: Response, @Body() body: RegisterUserDto) {

        try {
            const { access_token } = await this.usersService.register(body);
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
}
