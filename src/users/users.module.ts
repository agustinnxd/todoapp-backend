import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config'


import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    JwtModule.register({
      global:true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' }
    })],
  controllers: [UsersController],
  providers: [
    UsersService,
  ]
})
export class UsersModule { }
