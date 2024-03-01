import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
	@IsEmail({}, { message: 'користувача за такою поштою не знайдено' })
	'email': string;

	@IsString()
	'password': string;
}
