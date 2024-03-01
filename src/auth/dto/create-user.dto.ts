import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
	@IsEmail({}, { message: 'неправильний емейл' })
	email: string;
	@IsString()
	name: string;

	@IsString()
	password: string;

	@IsString({ message: 'будь ласка загрузіть фото' })
	avatar: string;
}
