import { Controller, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { mFile } from './mfile.class';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post('upload')
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('files'))
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
	): Promise<fileElementResponse[] | undefined> {
		if (file.mimetype.includes('image')) {
			const buffer = await this.filesService.convertToWebP(file.buffer);
			return this.filesService.saveFiles(
				new mFile({ originalname: `${file.originalname.split('.')[0]}.webp`, buffer }),
			);
		}
	}
}
