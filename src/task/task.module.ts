import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FilesModule } from 'src/files/files.module';
import { LikesModule } from 'src/likes/likes.module';

@Module({
	imports: [PrismaModule],
	providers: [TaskService],
	controllers: [TaskController],
})
export class TaskModule {}
