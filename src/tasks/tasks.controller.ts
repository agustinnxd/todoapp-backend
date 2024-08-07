import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTaskDto, UpdateTaskDto } from 'src/dto/tasks.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @UseGuards(AuthGuard)
    @Post()
    createTask(@Body() task: CreateTaskDto, @Request() req: any) {
        return this.tasksService.createTask(task, req)
    }

    @UseGuards(AuthGuard)
    @Get()
    getTasks(@Request() req: any) {
        return this.tasksService.getTasks(req)
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(id)
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    updateTask(@Param('id') id:string, @Body() task:UpdateTaskDto) {
        return this.tasksService.updateTask(id, task)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteTask(@Param('id') id:string) {
        return this.tasksService.deleteTask(id)
    }
}
