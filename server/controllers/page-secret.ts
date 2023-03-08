import { Request, Response } from 'express';
import ErrorPagesController from './error-pages.js';

const errorPagesController = new ErrorPagesController();

export default class PageSecretController {
	/**
	 * GET /
	 * Fake secret page -> redirect to 403 forbidden
	 */
	index = (req: Request, res: Response) => {
		// if (forbidden) 
			return errorPagesController.page403(req, res);
		// else 
		// 	go on with secret stuff ...
	};
}
