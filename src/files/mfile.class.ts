export class mFile {
	originalname: string;
	buffer: Buffer;

	constructor(file: Express.Multer.File | mFile) {
		this.buffer = file.buffer;
		this.originalname = file.originalname;
	}
}
