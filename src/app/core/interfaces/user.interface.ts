export interface User {
	readonly id: string;
	fullname: string;
	email: string;
	documentType: string;
	document: number;
	dateBirth: Date;
	photo?: File;
}
