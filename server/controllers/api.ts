import { Request, Response } from 'express';

export default class ApiController {
	/**
	 * POST /api/data-example
	 * return rendered pug file (api/data-example.pug)
	 */
	postDataExample = (req: Request, res: Response) => {
		return res.render('api/data-example', {
			say: req.body.say,
			again: req.body.again,
		});
	};
}
