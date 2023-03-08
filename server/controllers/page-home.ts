import { Request, Response } from 'express';

export default class PageHomeController {
	/**
	 * GET /
	 * Home page
	 */
	index = (req: Request, res: Response) => {
		return res.render('home', {
			title: 'Home',
			nonce: req.headers.nonce,
		});
	};
}
