import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';




@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async login(body: LoginUserDto) {
        const user = await this.userModel.findOne({ email: body.email })

        if (!user) {
            throw new HttpException({ error: 'Bad Request', message: ['Wrong Password or Email'] }, 400)
        }

        const isMatch = await bcrypt.compare(body.password, user.password)

        if (!isMatch) {
            throw new HttpException({ error: 'Bad Request', message: ['Wrong Password or Email'] }, 400)
        }

        return {
            access_token: await this.jwtService.signAsync({ id: user._id }),
            user
        }
    }

    logout(response: Response) {
        response.cookie('token', '', {
            expires: new Date(0)
        })
    }

    async profile(req: any) {
        const user = await this.userModel.findById(req.user.id)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }
}
