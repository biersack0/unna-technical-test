import { Component, OnInit } from '@angular/core';
import { Log } from '@core/interfaces/log.interface';
import { LogService } from '@core/services/log.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
	selector: 'app-logs',
	templateUrl: './logs.component.html',
	styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
	logs$: Observable<Log[]>;

	constructor(private logService: LogService) {
		this.logs$ = this.logService.logs$;
	}

	ngOnInit(): void {
		this.logService.getLogs();
	}
}
