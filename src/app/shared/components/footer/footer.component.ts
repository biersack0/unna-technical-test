import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
	year = new Date().getFullYear();

	github: AnimationOptions = {
		path: '../../../../assets/json/github.json',
		renderer: 'svg',
		autoplay: true,
		loop: true,
	};

	linkedin: AnimationOptions = {
		path: '../../../../assets/json/linkedin.json',
		renderer: 'svg',
		autoplay: true,
		loop: true,
	};
}
