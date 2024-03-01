import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { USER_ALREADY_EXISTS } from './auth.constants';
import { LoginUserDto } from './dto/login-user.dto';
import { JWTAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: CreateUserDto) {
		const user = await this.authService.findUser(dto.email);
		if (user) {
			throw new BadRequestException(USER_ALREADY_EXISTS);
		}
		return this.authService.create(dto);
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('login')
	async login(@Body() dto: LoginUserDto) {
		const { id } = await this.authService.validateUser(dto);
		return this.authService.login(id);
	}
}
