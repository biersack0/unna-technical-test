export class Utils {
	stringToDatetime(dateString: any): number {
		if (dateString.length == 8) {
			const date = `${dateString.substring(4, 8)}-${dateString.substring(2, 4)}-${dateString.substring(0, 2)}`;
			return new Date(date).getTime();
		}

		return 0;
	}
}
