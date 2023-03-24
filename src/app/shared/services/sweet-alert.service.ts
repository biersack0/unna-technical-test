import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class SweetAlertService {
	simpleAlert(icon: any, title: string, text: string) {
		Swal.fire({ icon, title, text });
	}

	successAlert(isEdit: boolean, title?: string, text?: string) {
		title = title ? title : isEdit ? 'Datos Actualizados' : 'Datos Registrados';
		text = text ? text : isEdit ? 'Los datos han sido actualizados correctamente.' : 'Los datos han sido registrados correctamente.';
		this.simpleAlert('success', title, text);
	}

	errorAlert(message: string) {
		this.simpleAlert('error', 'Error', `${message}`);
	}
}
