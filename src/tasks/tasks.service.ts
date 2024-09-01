import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from 'src/dto/tasks.dto';
import { Task } from 'src/schemas/task.schema';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>
    ) { }

    createTask(task: CreateTaskDto, req: any) {

        return this.taskModel.create({ ...task, user: req.user.id })
    }

    getTasks(req: any) {
        return this.taskModel.find({
            user: req.user.id
        }).populate('user')
    }

    getTaskById(id: string) {
        const task = this.taskModel.findById(id)
        if (!task) {
            throw new NotFoundException('Task not found')
        }
        return task
    }

    updateTask(id: string, body: UpdateTaskDto) {
        const task = this.taskModel.findById(id)
        if (!task) {
            throw new NotFoundException('Task not found')
        }
        return this.taskModel.findByIdAndUpdate(id, body, { new: true })
    }

    deleteTask(id: string) {
        const task = this.taskModel.findById(id)
        if (!task) {
            throw new NotFoundException('User not found')
        }
        return this.taskModel.findByIdAndDelete(id)
    }
}
