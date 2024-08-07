import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Task } from './task.schema';

@Schema({
    timestamps: true
})
export class User {
    @Prop({
        required: true,
        trim: true
    })
    username: string;

    @Prop({
        unique: true,
        required: true,
        trim: true
    })
    email: string

    @Prop({
        required: true
    })
    password: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task',
        required: true
    })
    tasks: Task[]
};

export const UserSchema = SchemaFactory.createForClass(User);

