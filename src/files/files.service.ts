import { Injectable } from '@nestjs/common';
import { fileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { mFile } from './mfile.class';

@Injectable()
export class FilesService {
	async saveFiles(file: mFile): Promise<fileElementResponse[]> {
		const uploadFolder = `${path}/upload`;
		await ensureDir(uploadFolder);

		const res: fileElementResponse[] = [];
		await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
		res.push({ url: `${file.originalname}`, name: file.originalname });

		return res;
	}

	async convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
}
