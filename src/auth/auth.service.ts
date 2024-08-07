import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
        @InjectModel(User.name) private userModel:Model<User>,
        private jwtService: JwtService
    ) {}

    async login(body: LoginUserDto) {
        const user = await this.userModel.findOne({email: body.email})

        if(!user) {
            throw new UnauthorizedException('wrong email or password / email')
        }

        const isMatch = await bcrypt.compare(body.password, user.password)

        if(!isMatch) {
            throw new UnauthorizedException('wrong email or password / password')
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

        if(!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }
}
