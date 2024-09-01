import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { RegisterUserDto, UpdateUserDto } from 'src/dto/users.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async registerUser(body: RegisterUserDto) {
        const { password } = body
        const hash = await bcrypt.hash(password, 10)
        body.password = hash
        const newUser = this.userModel.create(body)

        return {
            access_token: await this.jwtService.signAsync({ id: (await newUser)._id })
        }

    }

    async getUser (id:string) {
        const user = this.userModel.findById(id);

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    async updateUser(id: string, body: UpdateUserDto) {
        const user = this.userModel.findById(id);

        if (!user) {
            throw new NotFoundException('User not found')
        }

        try {
            return await this.userModel.findByIdAndUpdate(id, body, { new: true })
        } catch (error) {
            if (error.code === 11000) {
                throw new HttpException({ error: "Bad Request", message: ['email already registered'] }, 400)
            }
            throw error
        }
        
    }

    deleteUser(id: string) {
        const user = this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return this.userModel.findByIdAndDelete(id)
    }
}
