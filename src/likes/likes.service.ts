import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikesService {
	constructor(private readonly prismaService: PrismaService) {}

	async validateLike(userId: number, taskId: number) {
		return this.prismaService.likes.findFirst({
			where: {
				task_id: Number(taskId),
				user_id: Number(userId),
			},
		});
	}

	async addLike(userId: number, taskId: number) {
		return this.prismaService.likes.create({
			data: {
				user_id: Number(userId),
				task_id: Number(taskId),
			},
		});
	}

	async removeLike(like_id: number) {
		return this.prismaService.likes.delete({
			where: {
				like_id: Number(like_id),
			},
		});
	}

	async getUserLikes(userId: number) {
		const userLikes = await this.prismaService.likes.findMany({
			where: {
				user_id: Number(userId),
			},
			select: {
				task_id: true,
			},
		});
		return userLikes.map((like) => like.task_id);
	}
}
