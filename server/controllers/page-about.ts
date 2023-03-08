import { Request, Response } from 'express';

export default class PageAboutController {
	/**
	 * GET /
	 * About page
	 */
	index = (req: Request, res: Response) => {
		return res.render('about', {
			title: 'About',
			nonce: req.headers.nonce,
		});
	};
}
