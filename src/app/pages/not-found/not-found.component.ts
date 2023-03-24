import { Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AnimationOptions } from 'ngx-lottie';

@Component({
	selector: 'app-not-found',
	standalone: true,
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss'],
	imports: [SharedModule],
})
export class NotFoundComponent {
	notFound: AnimationOptions = {
		path: '../../../assets/json/404.json',
	};
}
