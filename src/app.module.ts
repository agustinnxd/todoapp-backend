import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:u4I9vFjqLIKSdx1e@tasksdb.wtbkcow.mongodb.net/'), UsersModule, AuthModule, TasksModule]
})
export class AppModule {}
