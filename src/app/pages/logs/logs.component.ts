import { Component } from '@angular/core';
import { Log } from '@core/interfaces/log.interface';
import { LogService } from '@core/services/log.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
	selector: 'app-logs',
	templateUrl: './logs.component.html',
	styleUrls: ['./logs.component.scss'],
})
export class LogsComponent {
	logs$: Observable<Log[]>;

	constructor(private logService: LogService) {
		this.logService.getLogs();
		this.logs$ = this.logService.logs$;
	}
}
