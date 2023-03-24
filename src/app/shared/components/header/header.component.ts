import { Component } from '@angular/core';

interface Route {
	name: string;
	path: string;
}

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	routes: Route[] = [
		{
			name: 'Inicio',
			path: '/',
		},
		{
			name: 'Logs',
			path: '/logs',
		},
	];
}
