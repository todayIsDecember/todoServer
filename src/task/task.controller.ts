import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	NotFoundException,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/Create-task.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateTaskDto } from './dto/Update-task.dto';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@UseGuards(JWTAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateTaskDto, @Req() req: any) {
		const user_id = await req.user;
		return this.taskService.createTask(dto, user_id);
	}
	@Get('getAll')
	async getAll() {
		return this.taskService.getAll();
	}

	@Patch('changePrivate/:id')
	async updatePrivate(@Body() dto: Pick<UpdateTaskDto, 'private'>, @Param('id') id: number) {
		return this.taskService.changePrivate(dto.private, id);
	}
	@Patch('changeStatus/:id')
	async updateStatus(@Body() dto: Pick<UpdateTaskDto, 'status'>, @Param('id') id: number) {
		return this.taskService.changeStatus(dto.status, id);
	}
}
