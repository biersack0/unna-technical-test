import { Injectable } from '@angular/core';
import { Database, DatabaseReference, onValue, push, ref, remove, update } from '@angular/fire/database';
import { Storage, ref as refStorage, uploadBytes, deleteObject } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '@core/interfaces/user.interface';
import { Timestamp } from '@firebase/firestore';
import { Utils } from '@shared/utils/utils';
import { LogService } from './log.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	usersRef: DatabaseReference;
	private _users = new BehaviorSubject<User[]>([]);

	constructor(private database: Database, private storage: Storage, private logService: LogService) {
		this.usersRef = ref(this.database, 'users');
	}

	get users$() {
		return this._users.asObservable();
	}

	getUsers() {
		onValue(this.usersRef, (snapshot) => {
			const data = snapshot.val();

			const users: User[] = [];
			for (const key in data) {
				const user = data[key];
				user.id = key;
				user.dateBirth = new Date(user.dateBirth * 1000);
				users.push(user);
			}

			console.log(users);

			this._users.next(users);
		});
	}

	createUser(user: User) {
		// const datetime = new Utils().stringToDatetime(user.dateBirth);

		const date = Timestamp.fromDate(user.dateBirth);

		push(this.usersRef, { ...user, dateBirth: date.seconds }).then(async ({ key }) => {
			if (user.photo) {
				await this.uploadImage(user.photo, key);
				await update(ref(this.database, `users/${key}`), {
					photo: `https://firebasestorage.googleapis.com/v0/b/unna-technical-test.appspot.com/o/${key}?alt=media&token=e745c054-44eb-4dd3-9c2b-1684c128385d`,
				});

				this.logService.createLog({
					message: `Se ha creado el usuario con id: ${key}.`,
				});
			}
		});

		// console.log(num);

		/* const date = Timestamp.fromDate(user.dateBirth);

		push(this.usersRef, { ...user, dateBirth: date.seconds }).then(async ({ key }) => {
			if (user.photo) {
				await this.uploadImage(user.photo, key);
				await update(ref(this.database, `users/${key}`), {
					photo: `https://firebasestorage.googleapis.com/v0/b/unna-technical-test.appspot.com/o/${key}?alt=media&token=e745c054-44eb-4dd3-9c2b-1684c128385d`,
				});
			}
		}); */
	}

	deleteUser(id: string) {
		remove(ref(this.database, `users/${id}`));
		this.deleteImage(id);

		this.logService.createLog({
			message: `Se ha eliminado el usuario con id: ${id}.`,
		});
	}

	async uploadImage(file: File, idUser: string | null) {
		await uploadBytes(refStorage(this.storage, `${idUser}`), file);
	}

	deleteImage(id: string) {
		deleteObject(refStorage(this.storage, `${id}`));
	}
}
