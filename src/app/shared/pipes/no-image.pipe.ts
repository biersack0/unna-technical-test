import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'noImage',
})
export class NoImagePipe implements PipeTransform {
	transform(value: string): string {
		if (value === '' || value === undefined) {
			return 'assets/img/no-image.png';
		}
		return value;
	}
}
