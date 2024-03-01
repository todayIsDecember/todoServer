import { Controller, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('likes')
export class LikesController {
	constructor(private readonly likesService: LikesService) {}

	@UseGuards(JWTAuthGuard)
	@HttpCode(201)
	@Post('add/:task_id')
	async addLike(@Req() req: any, @Param('task_id') task_id: number) {
		const existLike = await this.likesService.validateLike(req.user, task_id);
		if (existLike) {
			return this.likesService.removeLike(existLike.like_id);
		}
		return this.likesService.addLike(req.user, task_id);
	}

	@UseGuards(JWTAuthGuard)
	@HttpCode(200)
	@Get()
	async getUserLikes(@Req() req: any) {
		const userLikes = await this.likesService.getUserLikes(req.user);
		if (!userLikes) {
			return [];
		}
		return userLikes;
	}
}
