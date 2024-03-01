import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private prismaService: PrismaService) {}
	async getUserInfo(id: number) {
		return this.prismaService.users.findUnique({
			where: {
				user_id: Number(id),
			},
			include: {
				tasks: {
					include: {
						users: {
							select: {
								user_name: true,
								avatar: true,
							},
						},
						likes: {
							include: {
								users: {
									select: {
										user_name: true,
										avatar: true,
									},
								},
							},
						},
					},
				},
			},
		});
	}
	async getCountTaskByUserId(id: number) {
		return this.prismaService.tasks.count({
			where: {
				user_id: Number(id),
			},
		});
	}
	async getCountTaskDoneByUserId(id: number) {
		return this.prismaService.tasks.count({
			where: {
				user_id: Number(id),
				status: true,
			},
		});
	}

	async getCountTaskActiveByUserId(id: number) {
		return this.prismaService.tasks.count({
			where: {
				user_id: Number(id),
				status: false,
			},
		});
	}
}
