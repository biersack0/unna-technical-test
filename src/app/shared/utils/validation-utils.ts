import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidationUtils {
	isInvalid(control: AbstractControl) {
		return control.errors && control.touched;
	}

	getMessage(errorName: string, errorValue: any) {
		switch (errorName) {
			case 'required':
				return 'Campo requerido';
			case 'email':
				return 'El correo no es válido';
			case 'pattern':
				return 'No cumple con el formato permitido';
			case 'minlength':
				return `Debe tener ${errorValue.requiredLength} caracteres`;
			case 'maxlength':
				return `Sólo se permiten ${errorValue.requiredLength} caracteres`;
			case 'date':
				return `Debe ingresar una fecha válida`;
			default:
				return null;
		}
	}

	isValidEmail(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const value: string = control.value;
			const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail|outlook|hotmail|\w+)\.(com|com\.pe)$/;

			if (!emailRegex.test(value)) {
				return { email: true };
			}
			return null;
		};
	}

	isValidDate(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const value: string = control.value;

			if (value.length < 8 && value.length > 1) {
				return { date: true };
			}

			if (value.length == 8) {
				const date = `${value.substring(4, 8)}-${value.substring(2, 4)}-${value.substring(0, 2)}`;

				// Date invalid
				if (isNaN(Date.parse(date))) {
					return { date: true };
				}

				// Date less than today
				if (new Date(date).getTime() >= new Date().getTime()) {
					return { date: true };
				}
			}

			return null;
		};
	}

	onlyPressNumbers(event: any) {
		let key;
		if (event.type === 'paste') {
			key = event.clipboardData.getData('text/plain');
		} else {
			key = event.keyCode;
			key = String.fromCharCode(key);
		}
		const regex = /[0-9]|\./;
		if (!regex.test(key)) {
			event.returnValue = false;
			if (event.preventDefault) {
				event.preventDefault();
			}
		}
	}
}
