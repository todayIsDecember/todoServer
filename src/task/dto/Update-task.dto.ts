import { IsBoolean } from 'class-validator';

export class UpdateTaskDto {
	@IsBoolean()
	private: boolean;

	@IsBoolean()
	status: boolean;
}
