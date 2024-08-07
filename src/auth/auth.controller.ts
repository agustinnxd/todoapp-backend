import { Body, Controller, Get, HttpException, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    

    @Post('/login')
    async login(@Res({passthrough: true}) response: Response,@Body() body: LoginUserDto) {
        const { access_token, user } = await this.authService.login(body);
        response.cookie('token', access_token);

        return {
            status: 'authorized',
            access_token,
            user,
        }
    }

    @Post('/logout')
    async logout(@Res({passthrough: true}) response: Response) {
        this.authService.logout(response)
    }

    @UseGuards(AuthGuard)
    @Get('/profile') 
    profile(@Request() req: any) {
        return this.authService.profile(req)
    }
}
