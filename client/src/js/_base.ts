import '../css/_base.scss';

import * as $ from "jquery";

import Utils from './utils';
import Page from './page';

window.onload = function () {

	// assuming script gets uglified: window ensures access from other files/classes
	(window as any).utils = new Utils();
	// otherwise declare as const
	// const utils: Utils = new Utils();

	(window as any).page = new Page();

}
