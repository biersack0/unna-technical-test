import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Database, DatabaseReference, onValue, push, ref } from '@angular/fire/database';
import { Timestamp } from '@firebase/firestore';
import { Log } from '@core/interfaces/log.interface';

@Injectable({
	providedIn: 'root',
})
export class LogService {
	logsRef: DatabaseReference;
	private _logs = new BehaviorSubject<Log[]>([]);

	constructor(private database: Database) {
		this.logsRef = ref(this.database, 'logs');
	}

	get logs$() {
		return this._logs.asObservable();
	}

	getLogs() {
		onValue(this.logsRef, (snapshot) => {
			const data = snapshot.val();

			const logs: Log[] = [];
			for (const key in data) {
				const log = data[key];
				log.id = key;
				log.timestamp = new Date(log.timestamp * 1000);
				logs.push(log);
			}

			this._logs.next(logs);
		});
	}

	createLog(log: Log) {
		const timestamp = Timestamp.now().seconds;
		push(this.logsRef, { ...log, timestamp });
	}
}
