import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND, WRONG_PASSWORD_ERROR } from './auth.constants';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async create({ email, name, password, avatar }: CreateUserDto) {
		const salt = await genSalt(10);
		return this.prismaService.users.create({
			data: {
				user_email: email,
				user_name: name,
				user_passwor_hash: await hash(password, salt),
				avatar: avatar,
			},
		});
	}

	async findUser(email: string) {
		return this.prismaService.users.findFirst({
			where: {
				user_email: email,
			},
		});
	}

	async validateUser({ email, password }: LoginUserDto) {
		const user = await this.findUser(email);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND);
		}
		const currentPassword = await compare(password, user.user_passwor_hash);
		if (!currentPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}
		return { id: user.user_id };
	}

	async login(id: number) {
		const payload = { id };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
