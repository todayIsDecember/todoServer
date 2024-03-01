import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { LikesModule } from './likes/likes.module';

@Module({
	imports: [AuthModule, PrismaModule, TaskModule, FilesModule, UsersModule, LikesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
