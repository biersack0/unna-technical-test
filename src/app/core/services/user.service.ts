import { Injectable } from '@angular/core';
import { Database, DatabaseReference, onValue, push, ref, remove, set, update } from '@angular/fire/database';
import { Storage, ref as refStorage, uploadBytes, deleteObject } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '@core/interfaces/user.interface';
import { Timestamp } from '@firebase/firestore';
import { LogService } from './log.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	usersRef: DatabaseReference;
	private _users = new BehaviorSubject<User[]>([]);

	constructor(private database: Database, private storage: Storage, private logService: LogService, private toastr: ToastrService) {
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

			this._users.next(users);
		});
	}

	createUser(user: User) {
		const date = Timestamp.fromDate(user.dateBirth);

		push(this.usersRef, { ...user, dateBirth: date.seconds }).then(async ({ key }) => {
			if (user.photo) {
				const imageKey = await this.uploadImage(user.photo, key);

				await update(ref(this.database, `users/${key}`), {
					photo: `https://firebasestorage.googleapis.com/v0/b/unna-technical-test.appspot.com/o/${imageKey}?alt=media&token=e745c054-44eb-4dd3-9c2b-1684c128385d`,
				});
			}

			this.logService.createLog({
				message: `Se insertó el usuario con id: ${key}.`,
			});

			this.toastr.success(`Se insertó el usuario ${key}.`, 'Usuario creado!', {
				closeButton: true,
				timeOut: 3000,
			});
		});
	}

	async updateUser(id: string, user: User) {
		const date = Timestamp.fromDate(user.dateBirth);
		const { photo, ...rest } = user;

		if (photo) {
			const imageKey = await this.uploadImage(photo, id);
			await set(ref(this.database, `users/${id}`), {
				...rest,
				photo: `https://firebasestorage.googleapis.com/v0/b/unna-technical-test.appspot.com/o/${imageKey}?alt=media&token=e745c054-44eb-4dd3-9c2b-1684c128385d`,
				dateBirth: date.seconds,
			});
		} else {
			update(ref(this.database, `users/${id}`), {
				...rest,
				dateBirth: date.seconds,
			});
		}

		this.logService.createLog({
			message: `Se actualizó el usuario con id: ${id}.`,
		});

		this.toastr.success(`Se actualizó el usuario ${id}.`, 'Usuario actualizado!', {
			closeButton: true,
			timeOut: 3000,
		});
	}

	deleteUser(id: string) {
		remove(ref(this.database, `users/${id}`));
		this.deleteImage(id);

		this.logService.createLog({
			message: `Se elimino el usuario con id: ${id}.`,
		});

		this.toastr.error(`Se elimino el usuario ${id}.`, 'Usuario eliminado!', {
			closeButton: true,
			timeOut: 3000,
		});
	}

	async uploadImage(file: File, idUser: string | null) {
		const imageKey = `${idUser}${new Date().getTime()}`;

		await uploadBytes(refStorage(this.storage, `${imageKey}`), file);
		return imageKey;
	}

	deleteImage(id: string) {
		deleteObject(refStorage(this.storage, `${id}`));
	}
}
