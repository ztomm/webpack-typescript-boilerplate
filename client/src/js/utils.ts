export default class Utils {

	count: number;

	constructor() {
		this.count = 0;
	}

	getHello(): string {
		return `hello (${(++this.count).toString()})`;
	}

	// more utils
	// ...

}
