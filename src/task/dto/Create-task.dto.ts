import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export enum Categories {
	Sport = 'Sport',
	Study = 'Study',
	Habbits = 'Habbits',
}

export class CreateTaskDto {
	@IsString()
	title: string;

	@IsBoolean()
	@IsOptional()
	private?: boolean;

	@IsEnum(Categories)
	@IsString()
	category: Categories;
}
