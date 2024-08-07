import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { RegisterUserDto } from 'src/dto/register-user.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async register(body: RegisterUserDto) {
        const { password } = body
        const hash = await bcrypt.hash(password, 10)
        body.password = hash
        const newUser = this.userModel.create(body)

        return {
            access_token: await this.jwtService.signAsync({ id: (await newUser)._id })
        }

    }
}
