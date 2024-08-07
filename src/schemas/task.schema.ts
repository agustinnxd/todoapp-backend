import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema";

@Schema({
    timestamps: true
})
export class Task {
    @Prop({
        unique: true,
        trim: true,
        required: true
    })
    title: string

    @Prop({
        trim: true
    })
    description: string

    @Prop({
        default: false
    })
    done:boolean

    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    })
    user: User
};

export const TaskSchema = SchemaFactory.createForClass(Task);