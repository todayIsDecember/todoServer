import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/Create-task.dto';
import { format } from 'date-fns';
import uk from 'date-fns/locale/fr';

@Injectable()
export class TaskService {
	constructor(private readonly prismaService: PrismaService) {}

	//Створити нове завдання
	async createTask(dto: CreateTaskDto, id: number) {
		return this.prismaService.tasks.create({
			data: {
				title: dto.title,
				user_id: id,
				private: dto.private,
				created: format(new Date(), 'dd MMMM HH:mm', { locale: uk }),
				category: dto.category,
			},
		});
	}

	async getAll() {
		return this.prismaService.tasks.findMany({
			where: {
				private: false,
			},
			include: {
				users: {
					select: {
						user_name: true,
						avatar: true,
					},
				},
				likes: true,
			},
			orderBy: {
				task_id: 'desc',
			},
		});
	}

	async changePrivate(isPrivate: boolean, id: number) {
		return this.prismaService.tasks.update({
			where: {
				task_id: Number(id),
			},
			data: {
				private: isPrivate,
			},
		});
	}

	async changeStatus(isStatus: boolean, id: number) {
		return this.prismaService.tasks.update({
			where: {
				task_id: Number(id),
			},
			data: {
				status: isStatus,
			},
		});
	}
}
