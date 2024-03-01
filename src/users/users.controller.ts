import { Controller, Get, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';
import { USER_NOT_FOUND } from './users.constants';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@UseGuards(JWTAuthGuard)
	@Get('getInfo')
	async getUserInfo(@Req() req: any) {
		const id = await req.user;
		const user = await this.usersService.getUserInfo(id);
		if (!user) {
			throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return user;
	}

	@UseGuards(JWTAuthGuard)
	@Get('count')
	async getCountTasks(@Req() req: any) {
		const id = await req.user;
		const allCount = await this.usersService.getCountTaskByUserId(id);
		const doneCount = await this.usersService.getCountTaskDoneByUserId(id);
		const activeCount = await this.usersService.getCountTaskActiveByUserId(id);
		return {
			allCount,
			doneCount,
			activeCount,
		};
	}
}
