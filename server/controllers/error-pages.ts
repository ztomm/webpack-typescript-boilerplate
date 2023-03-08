import { Request, Response } from 'express';

export default class ErrorPagesController {
	/**
	 * 404 page not found
	 */
	page404 = (req: Request, res: Response) => {
		return res.status(404).render(`error-page.pug`, {
			pageName: 'pageError',
			nonce: req.headers.nonce,
			data: {
				h1: '404',
				p: 'Page not found.'
			},
		});
	};

	/**
	 * 403 forbidden access
	 */
	page403 = (req: Request, res: Response) => {
		return res.status(403).render(`error-page.pug`, {
			pageName: 'pageError',
			nonce: req.headers.nonce,
			data: {
				h1: '403',
				p: 'Forbidden access to this resource.'
			},
		});
	};
}
