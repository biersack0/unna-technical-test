import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';
import { SweetAlertService } from '@shared/services/sweet-alert.service';
import { ValidationUtils } from '@shared/utils/validation-utils';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	userForm: FormGroup = this.fb.group({
		fullname: ['', [Validators.required]],
		email: ['', [Validators.required, new ValidationUtils().isValidEmail()]],
		documentType: ['dni', [Validators.required]],
		document: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
		dateBirth: ['', [Validators.required, new ValidationUtils().isValidDate()]],
		photo: [''],
	});

	users$: Observable<User[]>;

	dateMax = new Date();
	imageToUpload: File | undefined;
	imagePrev: any;
	isUpdateUser = false;
	@ViewChild('imgFile') imgFile!: ElementRef;

	constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private sweetAlertService: SweetAlertService,
		private toastr: ToastrService
	) {
		this.users$ = this.userService.users$;
	}

	ngOnInit(): void {
		this.onChangeDocumentType();
		this.userService.getUsers();
	}

	get documentControl() {
		return this.userForm.get('document');
	}

	onChangeDocumentType() {
		this.userForm.get('documentType')?.valueChanges.subscribe({
			next: (documentType: string) => {
				this.documentControl?.reset('');
				let min = 0;
				documentType === 'ce' ? (min = 12) : (min = 8);

				this.documentControl?.setValidators([Validators.required, Validators.minLength(min)]);
				this.userForm.updateValueAndValidity();

				this.documentControl?.markAsTouched();
			},
		});
	}

	onChangeImage(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];

		if (file != undefined) {
			const formatAllowed = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

			if (!formatAllowed.includes(file.type)) {
				this.sweetAlertService.errorAlert('Solo están permitidos los archivos jpg, jpeg, png, webp.');
				return;
			}

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				this.imagePrev = reader.result;
			};

			this.imageToUpload = file;
		}
	}

	createUser() {
		// this.userForm.get('photo')?.reset();

		/* this.toastr.success('Hello world!', 'Toastr fun!', {
			closeButton: true,
			timeOut: 3000,
		}); */
		this.userForm.markAllAsTouched();

		if (this.userForm.valid) {
			const user: User = this.userForm.value;
			if (this.imageToUpload) {
				user.photo = this.imageToUpload;
			}

			this.userService.createUser(user);

			// Clear userForm
			this.imagePrev = undefined;
			this.resetUserForm();
		}

		this.resetUserForm();
	}

	updateUser(user: User) {
		this.isUpdateUser = true;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id, photo, ...rest } = user;
		this.imagePrev = photo;

		this.userForm.reset(rest);
	}

	cancelUpdateUser() {
		this.isUpdateUser = false;

		this.imagePrev = undefined;
		this.resetUserForm();
	}

	resetUserForm() {
		this.imgFile.nativeElement.value = '';
		this.userForm.reset({
			documentType: 'dni',
		});
		this.imagePrev = null;
	}

	deleteUser(id: string) {
		this.userService.deleteUser(id);
	}

	onlyPressNumbers(event: any) {
		new ValidationUtils().onlyPressNumbers(event);
	}
}
